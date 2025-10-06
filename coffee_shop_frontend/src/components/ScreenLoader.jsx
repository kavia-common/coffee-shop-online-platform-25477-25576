import { useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
function ScreenLoader({ screenName }) {
  const containerRef = useRef(null);
  const cssLinkRef = useRef(null);
  const jsScriptRef = useRef(null);
  const screenScriptRef = useRef(null);

  useEffect(() => {
    async function loadContent() {
      try {
        // Load HTML content
        const response = await fetch(`/assets/${screenName}.html`);
        const html = await response.text();
        
        // Extract body content using DOM parser
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const bodyContent = doc.querySelector('.root-frame').outerHTML;
        
        // Insert the HTML content
        if (containerRef.current) {
          containerRef.current.innerHTML = bodyContent;
        }

        // Load common CSS if not already loaded
        if (!document.querySelector('link[href="/assets/common.css"]')) {
          const commonCss = document.createElement('link');
          commonCss.rel = 'stylesheet';
          commonCss.href = '/assets/common.css';
          document.head.appendChild(commonCss);
          cssLinkRef.current = commonCss;
        }

        // Load screen-specific CSS
        const screenCss = document.createElement('link');
        screenCss.rel = 'stylesheet';
        screenCss.href = `/assets/${screenName}.css`;
        document.head.appendChild(screenCss);
        cssLinkRef.current = screenCss;

        // Load common JS if not already loaded
        if (!document.querySelector('script[src="/assets/app.js"]')) {
          const commonJs = document.createElement('script');
          commonJs.src = '/assets/app.js';
          document.body.appendChild(commonJs);
          jsScriptRef.current = commonJs;
        }

        // Load screen-specific JS
        const screenJs = document.createElement('script');
        screenJs.src = `/assets/${screenName}.js`;
        document.body.appendChild(screenJs);
        screenScriptRef.current = screenJs;
      } catch (error) {
        console.error('Error loading screen content:', error);
      }
    }

    loadContent();

    // Cleanup function
    return () => {
      // Remove screen-specific resources
      if (cssLinkRef.current) {
        cssLinkRef.current.remove();
      }
      if (screenScriptRef.current) {
        screenScriptRef.current.remove();
      }
    };
  }, [screenName]);

  return <div ref={containerRef} className="screen-container" />;
}

export default ScreenLoader;
