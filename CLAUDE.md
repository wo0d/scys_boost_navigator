# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Userscript** for enhancing the navigation bar of the "生财有术" (scys.com) website. The script adds a dropdown menu in the navigation bar containing links to favorite authors and collections.

## Key Files

- `scys_boost_navigator.js` - Main userscript file (UserScript format)
- Userscript metadata includes `@match https://scys.com/*` and excludes `/view/docx/*` paths

## Development Commands

Since this is a userscript project, there are no traditional build/test commands. Development involves:

1. **Install userscript manager**: Use Violentmonkey, Tampermonkey, or similar extension
2. **Load script**: Copy the script content into your userscript manager
3. **Test**: Visit https://scys.com/ to see the navigation enhancement
4. **Update**: Modify the script and reload the page to test changes

## Code Structure

The script follows this architecture:

1. **CSS Injection**: Custom styles for dropdown menu via `injectCSS()` function
2. **Button Configuration**: Array of author links defined in `buttonConfigs`
3. **DOM Manipulation**: 
   - Uses `MutationObserver` to wait for navigation bar to load
   - Finds "航海实战" link as insertion point
   - Creates dropdown container and menu items dynamically
4. **Navigation Enhancement**: Adds "收藏作者" dropdown with author links

## Key Functions

- `injectCSS(css)` - Injects custom CSS styles into the page
- `createButton(config)` - Creates individual author buttons
- `insertDropdown()` - Main function that adds the dropdown to navigation
- `waitForNav()` - Uses MutationObserver to ensure DOM is ready

## Configuration

Author links are configured in the `buttonConfigs` array (lines 84-115), containing:
- 亦仁 (main author)
- 亦仁的收藏夹 (author's favorites)
- 刘小排, 哥飞, 子木 (other authors)
- 超级标 (tag link)

## Deployment

The script is deployed via GitHub raw URL:
- Update URL: `https://raw.githubusercontent.com/wo0d/scys_boost_navigator/refs/heads/main/scys_boost_navigator.js`
- Users can install directly via userscript manager