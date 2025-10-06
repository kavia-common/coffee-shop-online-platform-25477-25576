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
          
          // Handle various relative path patterns
          const patterns = [
            /^\.\/figmaimages\//,
            /^\.\.\/figmaimages\//,
            /^figmaimages\//,
            /^\.\/assets\/figmaimages\//,
            /^\.\.\/assets\/figmaimages\//
          ];
          
          for (const pattern of patterns) {
            if (pattern.test(path)) {
              return `/assets/figmaimages/${path.split('/').pop()}`;
            }
          }
          
          return path;
        };

        // Process image sources
        rootFrame.querySelectorAll('img[src]').forEach(img => {
          const originalSrc = img.getAttribute('src');
          const newSrc = normalizePath(originalSrc);
          if (originalSrc !== newSrc) {
            if (process.env.NODE_ENV === 'development') {
              console.log(`Rewrote image path: ${originalSrc} -> ${newSrc}`);
            }
            img.setAttribute('src', newSrc);
          }
        });

        // Process SVG image/use references
        rootFrame.querySelectorAll('image[*|href], use[*|href]').forEach(el => {
          const originalHref = el.getAttributeNS('http://www.w3.org/1999/xlink', 'href');
          if (originalHref) {
            const newHref = normalizePath(originalHref);
            if (originalHref !== newHref) {
              if (process.env.NODE_ENV === 'development') {
                console.log(`Rewrote SVG href: ${originalHref} -> ${newHref}`);
              }
              el.setAttributeNS('http://www.w3.org/1999/xlink', 'href', newHref);
            }
          }
        });

        // Process source srcset
        rootFrame.querySelectorAll('source[srcset]').forEach(source => {
          const originalSrcset = source.getAttribute('srcset');
          const newSrcset = originalSrcset.split(',').map(src => {
            const [url, descriptor] = src.trim().split(' ');
            return `${normalizePath(url)}${descriptor ? ' ' + descriptor : ''}`;
          }).join(', ');
          
          if (originalSrcset !== newSrcset) {
            if (process.env.NODE_ENV === 'development') {
              console.log(`Rewrote srcset: ${originalSrcset} -> ${newSrcset}`);
            }
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
              if (process.env.NODE_ENV === 'development') {
                console.log(`Rewrote style URL: ${url} -> ${newUrl}`);
              }
            }
            return `url("${newUrl}")`;
          });
          
          if (style !== newStyle) {
            el.setAttribute('style', newStyle);
          }
        });

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
