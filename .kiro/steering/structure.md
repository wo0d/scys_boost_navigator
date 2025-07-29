# Project Structure

## File Organization

```
├── scys_boost_navigator.js    # Main userscript file
├── CLAUDE.md                  # Development documentation
├── .gitignore                 # Git ignore patterns
└── .kiro/                     # Kiro AI assistant configuration
    └── steering/              # AI guidance documents
```

## Core Files

### `scys_boost_navigator.js`
- **Purpose**: Main userscript implementation
- **Structure**: Single-file architecture with IIFE wrapper
- **Key Sections**:
  - Userscript metadata block (lines 1-12)
  - CSS injection function and styles (lines 20-70)
  - Button creation utilities (lines 72-82)
  - Configuration array `buttonConfigs` (lines 84-115)
  - DOM manipulation functions (lines 117-160)
  - Initialization logic (lines 162-175)

### `CLAUDE.md`
- **Purpose**: Development documentation and AI context
- **Contains**: Project overview, architecture, and development workflow

## Code Architecture

### Function Organization
1. **Utility Functions**: `injectCSS()`, `createButton()`
2. **Configuration**: `buttonConfigs` array with author links
3. **Core Logic**: `insertDropdown()`, `waitForNav()`
4. **Initialization**: Self-executing function with MutationObserver

### CSS Structure
- **Scoped Styles**: All CSS injected via `injectCSS()` function
- **BEM-like Naming**: `.favorites-dropdown-*` prefix for all classes
- **Responsive Design**: Hover-based dropdown interaction

## Development Patterns

### DOM Manipulation
- Use `querySelector()` for element selection
- Employ `MutationObserver` for dynamic content loading
- Create elements with `createElement()` and proper class assignment

### Configuration Management
- Centralized configuration in `buttonConfigs` array
- Each config object contains: `text`, `className`, `url`
- Easy to add/remove authors by modifying the array

### Error Prevention
- Check for existing elements before insertion
- Use conditional logic to prevent duplicate dropdowns
- Graceful handling of missing DOM elements