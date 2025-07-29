# Technology Stack

## Core Technologies

- **JavaScript (ES6+)**: Pure vanilla JavaScript, no frameworks or libraries
- **CSS3**: Custom styles for dropdown menu integration
- **DOM APIs**: MutationObserver, querySelector, createElement
- **Userscript Format**: Greasemonkey/Tampermonkey compatible

## Build System

This is a **zero-build** project - no compilation, bundling, or preprocessing required.

## Development Workflow

### Installation & Testing
```bash
# No installation commands - this is a userscript
# 1. Install a userscript manager (Violentmonkey, Tampermonkey)
# 2. Copy script content into userscript manager
# 3. Visit https://scys.com/ to test
```

### Development Process
1. **Edit**: Modify `scys_boost_navigator.js` directly
2. **Test**: Reload the target website to see changes
3. **Debug**: Use browser DevTools console for debugging

### Deployment
- **Distribution URL**: `https://raw.githubusercontent.com/wo0d/scys_boost_navigator/refs/heads/main/scys_boost_navigator.js`
- **Auto-updates**: Configured via `@updateURL` and `@downloadURL` metadata

## Key Dependencies

- **Target Site**: https://scys.com/* (excluding `/view/docx/*`)
- **Browser APIs**: Standard DOM manipulation APIs
- **Userscript Manager**: Violentmonkey, Tampermonkey, or similar extension

## Code Standards

- Use strict mode: `'use strict';`
- IIFE pattern for script isolation
- Descriptive function and variable names
- CSS-in-JS for styling (injected via `injectCSS()`)
- Event-driven architecture with MutationObserver