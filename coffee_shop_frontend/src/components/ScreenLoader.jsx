import { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
function ScreenLoader({ htmlFile }) {
  const containerRef = useRef(null);
  const loadedResourcesRef = useRef({
    common: false,
    css: null,
    script: null
  });

  useEffect(() => {
    async function loadContent() {
      try {
        console.log(`Loading screen content for ${htmlFile}`);
        
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
        if (!rootFrame) {
          throw new Error('No root-frame element found in HTML');
        }
        
        // Process and rewrite asset paths
        rootFrame.querySelectorAll('img[src^="figmaimages/"]').forEach(img => {
          img.src = `/assets/${img.getAttribute('src')}`;
        });
        
        // Insert HTML content without scripts/links
        if (containerRef.current) {
          containerRef.current.innerHTML = rootFrame.outerHTML;
        }

        // Load common.css if not already loaded
        if (!loadedResourcesRef.current.common) {
          const commonLink = document.createElement('link');
          commonLink.rel = 'stylesheet';
          commonLink.href = '/assets/common.css';
          document.head.appendChild(commonLink);
          loadedResourcesRef.current.common = true;
        }

        // Remove previous screen-specific resources
        if (loadedResourcesRef.current.css) {
          loadedResourcesRef.current.css.remove();
        }
        if (loadedResourcesRef.current.script) {
          loadedResourcesRef.current.script.remove();
        }

        // Extract filename base without extension
        const baseFilename = htmlFile.replace('.html', '');

        // Add screen-specific CSS
        const cssLink = document.createElement('link');
        cssLink.rel = 'stylesheet';
        cssLink.href = `/assets/${baseFilename}.css`;
        document.head.appendChild(cssLink);
        loadedResourcesRef.current.css = cssLink;

        // Load app.js once if not already present
        const existingAppScript = document.querySelector('script[src="/assets/app.js"]');
        if (!existingAppScript) {
          const appScript = document.createElement('script');
          appScript.src = '/assets/app.js';
          appScript.defer = true;
          document.body.appendChild(appScript);
        }

        // Load screen-specific JS
        const screenScript = document.createElement('script');
        screenScript.src = `/assets/${baseFilename}.js`;
        screenScript.defer = true;
        document.body.appendChild(screenScript);
        loadedResourcesRef.current.script = screenScript;

      } catch (error) {
        console.error('Error in ScreenLoader:', error);
      }
    }

    loadContent();

    // Cleanup function
    return () => {
      // Remove screen-specific resources
      if (loadedResourcesRef.current.css) {
        loadedResourcesRef.current.css.remove();
      }
      if (loadedResourcesRef.current.script) {
        loadedResourcesRef.current.script.remove();
      }
    };
  }, [htmlFile]);

  return <div ref={containerRef} className="screen-container" />;
}

export default ScreenLoader;
