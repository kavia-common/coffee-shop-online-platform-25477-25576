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
        
        // Get the root-frame content
        const rootFrame = doc.querySelector('.root-frame');
        if (!rootFrame && containerRef.current) {
          // Fallback to main content if no root-frame
          const mainContent = doc.querySelector('main');
          if (mainContent) {
            containerRef.current.innerHTML = mainContent.innerHTML;
          } else {
            throw new Error('No root-frame or main content found in HTML');
          }
        } else if (rootFrame && containerRef.current) {
          containerRef.current.innerHTML = rootFrame.outerHTML;
        }

        // Process assets only if this mount is still current
        if (!isCurrentMount) return;

        // Rewrite asset paths in the container
        if (containerRef.current) {
          containerRef.current.querySelectorAll('img[src^="figmaimages/"]').forEach(img => {
            img.src = `/assets/${img.getAttribute('src')}`;
          });
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

        // Inject common.css if not already present
        resourcesRef.current.commonCss = injectCssLink('/assets/common.css', 'common-css');

        // Extract filename base without extension
        const baseFilename = htmlFile.replace('.html', '');

        // Inject screen-specific CSS
        resourcesRef.current.screenCss = injectCssLink(`/assets/${baseFilename}.css`, `${baseFilename}-css`);

        // Inject app.js once if not already present
        resourcesRef.current.appJs = injectScript('/assets/app.js', 'app-js');

        // Inject screen-specific JS
        resourcesRef.current.screenJs = injectScript(`/assets/${baseFilename}.js`, `${baseFilename}-js`);

      } catch (error) {
        console.error('Error in ScreenLoader:', error);
      }
    }

    loadContent();

    // Cleanup function
    return () => {
      isCurrentMount = false;

      // Remove screen-specific resources only
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
