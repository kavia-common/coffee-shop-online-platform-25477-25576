# Screen Integration Notes

## Route Mappings

The following routes have been set up to render the static screens:

- `/screens` - Index page with links to all screens
- `/screens/cafe` -> loads `cafe-screen-1-6.html` (Cafe details view)
- `/screens/home` -> loads `home-screen-1-3.html` (Home screen with coffee shop listings)  
- `/screens/notes` -> loads `notes-delete-after-reading-8-3.html` (Application notes)
- `/screens/mappin` -> loads `mappin-207-42.html` (Map location marker)
- `/screens/coffee-app` -> loads `coffee-shop-app-8-21.html` (Main application view)

## Implementation Details

- Each screen is loaded using the `ScreenLoader` component that:
  - Fetches and injects the HTML content
  - Loads screen-specific CSS file
  - Loads screen-specific JS file
  - Handles cleanup on unmount
  
- Common assets (`common.css` and `app.js`) are loaded only once
- All image paths using `figmaimages/` are preserved and work correctly
- The screens are integrated into the React app while maintaining their original styling and functionality

## Asset Organization

- All static assets are served from the `public/assets` directory
- Original HTML/CSS/JS files are preserved without modifications
- Images are served from `public/assets/figmaimages`

## Navigation

The screens can be accessed through:
1. Direct URL navigation using the routes above
2. The index page at `/screens` which provides links to all available screens
