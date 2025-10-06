import { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
function ScreenLoader({ htmlFile }) {
  const containerRef = useRef(null);
  const cssLinksRef = useRef([]);
  const scriptsRef = useRef([]);

  useEffect(() => {
    async function loadContent() {
      try {
        // Load HTML content
        const response = await fetch(`/assets/${htmlFile}`);
        const html = await response.text();
        
        // Parse the HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        
        // Fix relative asset paths
        doc.querySelectorAll('link[href^="./"]').forEach(link => {
          link.href = link.href.replace('./', '/assets/');
        });
        
        doc.querySelectorAll('script[src^="./"]').forEach(script => {
          script.src = script.src.replace('./', '/assets/');
        });
        
        doc.querySelectorAll('img[src^="figmaimages/"]').forEach(img => {
          img.src = `/assets/${img.getAttribute('src')}`;
        });

        // Extract the root-frame content
        const rootFrame = doc.querySelector('.root-frame');
        if (!rootFrame) {
          throw new Error('No root-frame element found in HTML');
        }
        
        // Insert the HTML content
        if (containerRef.current) {
          containerRef.current.innerHTML = rootFrame.outerHTML;
        }

        // Load CSS files
        const cssFiles = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
        cssFiles.forEach(css => {
          const newLink = document.createElement('link');
          newLink.rel = 'stylesheet';
          newLink.href = css.href.startsWith('./') ? `/assets/${css.href.slice(2)}` : css.href;
          document.head.appendChild(newLink);
          cssLinksRef.current.push(newLink);
        });

        // Load JavaScript files
        const scripts = Array.from(doc.querySelectorAll('script[src]'));
        scripts.forEach(script => {
          const newScript = document.createElement('script');
          newScript.src = script.src.startsWith('./') ? `/assets/${script.src.slice(2)}` : script.src;
          document.body.appendChild(newScript);
          scriptsRef.current.push(newScript);
        });
      } catch (error) {
        console.error('Error loading screen content:', error);
      }
    }

    loadContent();

    // Cleanup function
    return () => {
      // Remove all added resources
      cssLinksRef.current.forEach(link => link.remove());
      scriptsRef.current.forEach(script => script.remove());
      cssLinksRef.current = [];
      scriptsRef.current = [];
    };
  }, [htmlFile]);

  return <div ref={containerRef} className="screen-container" />;
}

export default ScreenLoader;
