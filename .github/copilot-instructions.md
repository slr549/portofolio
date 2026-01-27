# Copilot Instructions for Portofolio Project

## Project Overview
This is a **multidisciplinary portfolio website** showcasing Web Development, UI/UX Design, Graphic Design, and Data Analysis work. It contains three distinct implementations:
1. **Main Portfolio** (`index.html`) - Vanilla JS with Three.js 3D background, multi-language, multi-theme support
2. **React CV** (`cv_pribadi/`) - React + Tailwind CSS + Framer Motion with context-based state management
3. **CV Hybrid** (`cv-hybrid/`) - Standalone HTML/JS CV generator with template switching and PDF export

## Architecture & Key Components

### State Management Pattern
- **Theme System**: Uses React Context (`ThemeContext.js`) with localStorage persistence
  - Themes: `light`, `dark`, `cyber`, `nature`, `sunset`
  - Applied via CSS custom properties (`:root` and theme class selectors)
  - Main portfolio uses vanilla JS with CSS class toggling; React version uses Context Provider
  
- **Internationalization**: Uses React Context (`LanguageContext.js`) + translation objects
  - Supported: Indonesian (`id`), English (`en`), Japanese (`ja`), Chinese (`zh`)
  - Main portfolio uses vanilla JS translations object
  - Translation keys are referenced as `data-i18n` attributes in HTML

### Directory Structure Conventions
```
portofolio/
├── index.html                    # Main vanilla JS portfolio (entry point for root domain)
├── cv_pribadi/                   # React-based CV (npm start/build)
│   ├── src/
│   │   ├── components/           # Reusable React components (Navbar, Hero, Skills, etc.)
│   │   ├── contexts/             # Provider contexts (Theme, Language)
│   │   ├── App.js               # Main routing component
│   │   └── index.css            # Tailwind CSS imports
│   ├── public/index.html         # React entry point
│   ├── package.json             # React scripts, Tailwind, Framer Motion
│   └── postcss.config.js        # Tailwind CSS configuration
└── cv-hybrid/                    # Vanilla JS CV generator
    ├── script.js                # Template rendering, event handlers, PDF export
    ├── cv-data.json            # Editable CV data structure
    ├── templates/              # HTML template variants (modern, creative, professional)
    └── style.css               # Base styling + template-specific overrides
```

## Critical Development Workflows

### React Project (`cv_pribadi/`)
```bash
npm start      # Dev server on port 3000
npm run build  # Production build → `build/` folder
npm test       # Run tests
```

### Main Portfolio (`index.html`)
- **No build step required** - runs directly in browser
- **Three.js background**: Initialized in `<script>` tag; check `initThreeJS()` function
- **Dynamic content rendering**: Uses `updateContent()` to swap translations
- **Skill bars animation**: `animateSkillBars()` uses IntersectionObserver to trigger on scroll

### CV Hybrid (`cv-hybrid/`)
- **Data persistence**: `localStorage.setItem('cvData', JSON.stringify(cvData))`
- **Template switching**: Changes DOM by swapping template HTML from `templates/` folder
- **PDF export**: Implemented via `downloadPdfBtn` event listener (uses library TBD)

## Key Patterns & Conventions

### Theme Switching in React
All components access theme via:
```javascript
const { isDarkMode, toggleTheme } = useTheme();
```
Tailwind classes use `dark:` prefix for dark mode (requires `darkMode: 'class'` in `tailwind.config.js`).

### Language-Aware Components
Components fetch translations:
```javascript
const { language, toggleLanguage, translations } = useLanguage();
// Usage: translations[language].keyName
```

### Vanilla JS (Main Portfolio) - Skills Collapsible
- Categories use `.category-content` wrapper with `max-height: 0` → `max-height: 500px` on `.active` class
- Toggle controlled by `.category-header` click listener
- **Important**: Categories open on page load via `skillContents.forEach(content => content.classList.add('active'))`

### Experience/Project Filtering
Both main portfolio and cv-hybrid use data attributes for filtering:
```html
<div class="timeline-item" data-category="sekolah">...</div>
```
Filtered via: `filterButtons.forEach(button => { button.addEventListener('click', () => {...}) })`

## Integration Points & External Dependencies

### React Dependencies
- **framer-motion** (v10.18.0): Scroll animations, stagger effects
- **react-icons** (v4.12.0): Icon components throughout
- **tailwindcss** (v3.3.0): Utility-first CSS with dark mode support
- **react-scripts** (v5.0.1): Build & development tooling

### Vanilla JS (Main Portfolio)
- **Three.js** (v0.132.2): 3D particle background (loaded via CDN)
- **Font Awesome** (6.4.0): Icons via CDN
- **Google Fonts**: Space Grotesk + Inter fonts

### Build Issues to Watch
- React build may fail if dependencies aren't installed (`npm install` first)
- Three.js background requires `#three-bg` DOM element
- PDF export in cv-hybrid likely incomplete (check library integration)

## File Naming & Conventions

### React Components
- `.jsx` extension for components
- PascalCase naming (e.g., `Navbar.jsx`, `Hero.jsx`)
- One component per file in `src/components/`

### Vanilla JS Files
- Use meaningful function names: `initThreeJS()`, `animateSkillBars()`, `updateContent()`
- Global variables clearly marked: `// Current language and theme`
- Event listeners grouped by feature (Settings, Language, Theme, Skills, etc.)

### CSS Custom Properties (CSS Variables)
Main portfolio uses extensively:
```css
:root { --primary-color, --text-primary, --bg-card, --shadow, --neon-glow, etc. }
```
Theme classes (`.dark-theme`, `.cyber-theme`) override root variables.

## Debugging Tips

### Skills Animation Not Running
- Check if skill category has `.active` class on page load
- Verify `IntersectionObserver` is watching `.skill-progress` elements
- Inspect `animateSkillBars()` execution in DOMContentLoaded event

### Theme Not Persisting
- Verify localStorage is writing: `localStorage.getItem('theme')` in console
- Check if `useTheme` Hook is properly wrapping component tree
- Ensure CSS dark mode class is toggling on `<html>` element

### React Build Failure
- Run `npm install` in `cv_pribadi/` directory first
- Check `package.json` scripts section
- Verify Node.js version compatibility (v14+)

### Three.js Background Missing
- Confirm `#three-bg` div exists and has correct z-index: `-1`
- Check browser console for WebGL errors
- Verify Three.js CDN link is loaded (network tab)

## Common Workflows for AI Agents

### Adding a New Skill Category
1. Add HTML in main `index.html` Skills section with new `.skill-category` div
2. Ensure translations exist in `translations` object for all languages
3. Update `skill-cat-title` class logic in `updateContent()` function

### Adding Translation Keys
1. Add key to all language objects in `translations` (id, en, ja, zh)
2. Add corresponding DOM element with unique `id` attribute
3. Update `updateContent()` function to set `.textContent` for that element
4. For React: add to both `LanguageContext.js` and component usage

### Fixing Component Layout Issues
- Use `grid-template-columns: repeat(auto-fill, minmax(Xpx, 1fr))` for responsive grids
- Tailwind: leverage `grid-cols-*` and `md:grid-cols-*` responsive breakpoints
- Check `max-width` container constraints (usually 1300px for main, tailwind defaults for React)

### Updating CV Data
- **React version**: Modify form inputs in edit mode → state updates → re-renders
- **Vanilla version**: Edit `cv-data.json` → `script.js` reads via `cvData` object → call `renderCV()`
- **Hybrid version**: localStorage syncs data across refreshes

## Testing Checklist Before Deployment
- [ ] Test theme switching (light → dark → all custom themes)
- [ ] Test language switching (all 4 languages load correct text)
- [ ] Test skill animations on scroll (appears when category scrolls into view)
- [ ] Test project filtering (all filter buttons work)
- [ ] Test mobile responsiveness (`@media (max-width: 768px)` and `480px`)
- [ ] Verify Three.js background renders without WebGL errors
- [ ] Confirm localStorage saves theme/language preferences
- [ ] Test form submission in Contact section
- [ ] Verify CV PDF export works (if applicable)
