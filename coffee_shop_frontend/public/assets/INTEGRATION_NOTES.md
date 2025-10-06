# Screen Integration Notes

## Route Mappings

The following routes have been set up to render the static screens:

- `/screens` - Index page with links to all screens
- `/screens/cafe-screen-1-6` -> loads `cafe-screen-1-6.html` (Cafe details view)
- `/screens/home-screen-1-3` -> loads `home-screen-1-3.html` (Home screen with coffee shop listings)
- `/screens/mappin-207-42` -> loads `mappin-207-42.html` (Map location marker component)
- `/screens/notes-delete-after-reading-8-3` -> loads `notes-delete-after-reading-8-3.html` (Application notes)
- `/screens/coffee-shop-app-8-21` -> loads `coffee-shop-app-8-21.html` (Coffee Shop App with splash screen)

## Asset Paths

All assets are served from the `/public/assets` directory:

- HTML files are loaded from `/assets/<filename>.html`
- CSS files are loaded from `/assets/<filename>.css`
- JavaScript files are loaded from `/assets/<filename>.js`
- Common assets:
  - `/assets/common.css` - Shared styles
  - `/assets/app.js` - Common JavaScript
- Images:
  - Figma images are loaded from `/assets/figmaimages/<filename>`

## Path Resolution

The ScreenLoader component handles path normalization:
- `./` or relative paths are rewritten to `/assets/`
- `figmaimages/` paths are rewritten to `/assets/figmaimages/`
- External resources (fonts, etc.) keep their absolute URLs

## Troubleshooting

1. If images are not loading:
   - Check that they exist in `/public/assets/figmaimages/`
   - Verify the image paths in HTML match the filenames exactly (case-sensitive)

2. If styles are not applying:
   - Check browser console for 404 errors on CSS files
   - Verify that common.css and screen-specific CSS are both loaded
   - Check that CSS variables are defined in common.css

3. If JavaScript is not working:
   - Ensure app.js loads before screen-specific JS
   - Check browser console for script errors
   - Verify that screen-specific JS is properly loaded and initialized

4. If routes are not working:
   - URLs are case-sensitive
   - All routes must be prefixed with `/screens/`
   - Screen filenames must match the route exactly
