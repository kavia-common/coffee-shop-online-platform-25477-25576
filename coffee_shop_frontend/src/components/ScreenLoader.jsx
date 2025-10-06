import { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
/**
 * ScreenLoader component that loads HTML content from static files and injects required resources.
 * Handles path rewriting and proper cleanup of injected resources.
 * @param {Object} props - Component props
 * @param {string} props.htmlFile - Name of the HTML file to load from /assets/
 */
function ScreenLoader({ htmlFile }) {
  // Refs to track injected resources for cleanup
  const containerRef = useRef(null);
  const resourcesRef = useRef({
    commonCss: null,
    screenCss: null,
    appJs: null,
    screenJs: null
  });

  useEffect(() => {
    let isCurrentMount = true;

    async function loadContent() {
      try {
        // Load HTML content
        const response = await fetch(`/assets/${htmlFile}`);
        if (!response.ok) {
          throw new Error(`Failed to load ${htmlFile}: ${response.status}`);
        }
        const html = await response.text();
        
        // Parse HTML without executing scripts
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Get the root-frame content or main content
        const rootFrame = doc.querySelector('.root-frame') || doc.querySelector('main');
        if (!rootFrame) {
          throw new Error('No root-frame or main content found in HTML');
        }

        if (!isCurrentMount) return;

        // Function to normalize paths to start with /assets/
        const normalizePath = (path) => {
          if (!path) return path;
          // Skip absolute URLs and already normalized paths
          if (path.startsWith('http') || path.startsWith('https') || path.startsWith('/assets/')) {
            return path;
          }
          
          // Handle all figmaimages path patterns
          if (path.includes('figmaimages/')) {
            const filename = path.split('figmaimages/').pop();
            // Validate file existence in development
            if (process.env.NODE_ENV === 'development') {
              fetch(`/assets/figmaimages/${filename}`).then(res => {
                if (!res.ok) {
                  console.warn(`Image not found: ${path}`);
                }
              }).catch(err => {
                console.warn(`Failed to verify image: ${path}`, err);
              });
            }
            return `/assets/figmaimages/${filename}`;
          }
          
          return path;
        };

        // Verify and normalize all image paths after injection
        const verifyPaths = () => {
          if (process.env.NODE_ENV !== 'development') return;
          
          // Check all image sources
          const verifyImage = (el, attr, ns = null) => {
            const originalPath = ns ? 
              el.getAttributeNS(ns, attr) : 
              el.getAttribute(attr);
            
            if (!originalPath) return;
            
            const newPath = normalizePath(originalPath);
            if (originalPath !== newPath) {
              console.log(`Normalized path: ${originalPath} -> ${newPath}`);
              if (ns) {
                el.setAttributeNS(ns, attr, newPath);
              } else {
                el.setAttribute(attr, newPath);
              }
            }
            
            // Verify the file exists
            if (!newPath.startsWith('http')) {
              fetch(newPath).then(res => {
                if (!res.ok) {
                  console.warn(`Resource not found: ${newPath}`);
                }
              }).catch(err => {
                console.warn(`Failed to verify resource: ${newPath}`, err);
              });
            }
          };

          // Process all image sources
          rootFrame.querySelectorAll('img[src]').forEach(img => {
            verifyImage(img, 'src');
          });

          // Process all SVG image/use references
          rootFrame.querySelectorAll('image[*|href], use[*|href]').forEach(el => {
            verifyImage(el, 'href', 'http://www.w3.org/1999/xlink');
          });

          // Process source elements with srcset
          rootFrame.querySelectorAll('source[srcset]').forEach(source => {
            const srcset = source.getAttribute('srcset');
            if (!srcset) return;
            
            const newSrcset = srcset.split(',').map(src => {
              const [url, descriptor] = src.trim().split(' ');
              return `${normalizePath(url)}${descriptor ? ' ' + descriptor : ''}`;
            }).join(', ');
            
            if (srcset !== newSrcset) {
              console.log(`Normalized srcset: ${srcset} -> ${newSrcset}`);
              source.setAttribute('srcset', newSrcset);
            }
          });

          // Process inline styles with url() references
          rootFrame.querySelectorAll('[style*="url("]').forEach(el => {
            const style = el.getAttribute('style');
            if (!style) return;
            
            const newStyle = style.replace(/url\(['"]?([^'")]+)['"]?\)/g, (match, url) => {
              const newUrl = normalizePath(url);
              if (url !== newUrl) {
                console.log(`Normalized style URL: ${url} -> ${newUrl}`);
              }
              return `url("${newUrl}")`;
            });
            
            if (style !== newStyle) {
              el.setAttribute('style', newStyle);
            }
          });
        };

        // Initial path processing for content
        rootFrame.querySelectorAll('*').forEach(el => {
          Array.from(el.attributes).forEach(attr => {
            if (attr.value.includes('figmaimages/')) {
              const newValue = normalizePath(attr.value);
              if (attr.value !== newValue) {
                el.setAttribute(attr.name, newValue);
              }
            }
          });
        });

        // Run verification after content is injected
        if (process.env.NODE_ENV === 'development') {
          verifyPaths();
        }

        // Update container content
        if (containerRef.current) {
          containerRef.current.innerHTML = rootFrame.outerHTML;
        }

        // Helper function to create and inject CSS link
        const injectCssLink = (href, id) => {
          const existingLink = document.head.querySelector(`link[href="${href}"]`);
          if (existingLink) return existingLink;

          const link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = href;
          link.id = id;
          document.head.appendChild(link);
          return link;
        };

        // Helper function to create and inject JS script
        const injectScript = (src, id) => {
          const existingScript = document.body.querySelector(`script[src="${src}"]`);
          if (existingScript) return existingScript;

          const script = document.createElement('script');
          script.src = src;
          script.defer = true;
          script.id = id;
          document.body.appendChild(script);
          return script;
        };

        // Load CSS files
        resourcesRef.current.commonCss = injectCssLink('/assets/common.css', 'common-css');
        
        // Extract filename base without extension
        const baseFilename = htmlFile.replace('.html', '');
        resourcesRef.current.screenCss = injectCssLink(`/assets/${baseFilename}.css`, `${baseFilename}-css`);

        // Load JavaScript files
        resourcesRef.current.appJs = injectScript('/assets/app.js', 'app-js');
        resourcesRef.current.screenJs = injectScript(`/assets/${baseFilename}.js`, `${baseFilename}-js`);

      } catch (error) {
        console.error('Error in ScreenLoader:', error);
        if (process.env.NODE_ENV === 'development') {
          console.warn('Detailed error:', error.message);
        }
      }
    }

    loadContent();

    // Cleanup function
    return () => {
      isCurrentMount = false;

      // Remove screen-specific resources
      if (resourcesRef.current.screenCss) {
        resourcesRef.current.screenCss.remove();
      }
      if (resourcesRef.current.screenJs) {
        resourcesRef.current.screenJs.remove();
      }
      
      // Clear container content
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [htmlFile]); // Re-run effect when htmlFile changes

  return <div ref={containerRef} className="screen-container" />;
}

export default ScreenLoader;
