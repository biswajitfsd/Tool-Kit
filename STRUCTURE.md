# Project Structure Documentation

## Complete File Structure

```
TOOL-KIT/
│
├── .vscode/                          # VS Code workspace settings
│   ├── settings.json                 # Editor preferences (4-space indent, format on save)
│   └── extensions.json               # Recommended VS Code extensions
│
├── clock/                            # Digital Clock Tool
│   ├── app.js                        # Clock functionality (time display, updates)
│   ├── index.html                    # Clock page HTML
│   └── style.css                     # Clock-specific styles (optional)
│
├── countdown-timer/                  # Pomodoro Timer Tool
│   ├── app.js                        # Timer logic (start, stop, presets, breaks)
│   ├── index.html                    # Timer page HTML with circular progress
│   └── style.css                     # Timer-specific styles (card, buttons, progress ring)
│
├── fonts/                            # Custom Font Files
│   └── ds_digital/                   # Digital display font family
│       ├── DIGITAL.TXT               # Font information
│       ├── DS-DIGI.TTF               # Digital font regular
│       ├── DS-DIGIB.TTF              # Digital font bold
│       ├── DS-DIGII.TTF              # Digital font italic
│       └── DS-DIGIT.TTF              # Digital font thin
│
├── .editorconfig                     # Cross-editor configuration
├── .gitignore                        # Git ignore rules
├── CNAME                             # Custom domain for GitHub Pages (if applicable)
├── favicon.ico                       # Website favicon
├── LICENSE                           # Project license file
├── README.md                         # Project documentation
├── robots.txt                        # Search engine crawler rules
├── sitemap.xml                       # SEO sitemap
│
├── index.html                        # Homepage (tool cards, navigation)
├── index.js                          # Main JS (theme toggle, navigation logic)
│
├── common.css                        # Shared styles (colors, theme, menu, fonts)
├── home.css                          # Homepage-specific styles (cards, grid, animations)
├── clock.css                         # Clock page styles (display, layout)
├── countdown.css                     # Countdown timer styles (buttons, timer display)
└── style.css                         # Legacy/combined styles (backup)
```

## File Descriptions

### Root Files

| File | Purpose |
|------|---------|
| `index.html` | Main landing page with tool cards |
| `index.js` | Theme management and smart navigation |
| `common.css` | Shared styles across all pages |
| `home.css` | Homepage card grid and animations |
| `sitemap.xml` | SEO sitemap for search engines |
| `robots.txt` | Search engine crawler instructions |
| `README.md` | Project documentation |
| `.editorconfig` | Ensures consistent coding styles |
| `.gitignore` | Git version control ignore rules |

### Clock Directory (`/clock/`)

| File | Purpose |
|------|---------|
| `index.html` | Digital clock interface |
| `app.js` | Updates time display every second |
| `style.css` | Clock-specific styling (optional override) |

### Countdown Timer Directory (`/countdown-timer/`)

| File | Purpose |
|------|---------|
| `index.html` | Pomodoro timer with circular progress |
| `app.js` | Timer logic, presets, session tracking |
| `style.css` | Modern card design with progress ring |

### VS Code Directory (`/.vscode/`)

| File | Purpose |
|------|---------|
| `settings.json` | 4-space indentation, format on save |
| `extensions.json` | Recommended extensions list |

### Fonts Directory (`/fonts/ds_digital/`)

Custom digital font family used for timer and clock displays.

## CSS Architecture

### CSS Loading Order

Each page loads CSS in this order:
1. `common.css` - Base styles, variables, theme, navigation
2. Page-specific CSS - `home.css`, `clock.css`, or `countdown.css`

### CSS Variables (in `common.css`)

```css
:root {
    --primary-colour: #4e4d4d;      /* Main text color */
    --body-bg: rgba(0, 0, 0, 0);    /* Background */
    --card-bg: #ffffff;              /* Card background */
    --accent-color: #4a90e2;         /* Primary accent */
    --text-secondary: #6c757d;       /* Secondary text */
    --border-color: #e0e0e0;         /* Borders */
}
```

## JavaScript Architecture

### Main Scripts

1. **index.js** (All pages)
   - Theme toggle (light/dark)
   - Smart navigation (hide current page link)
   - System theme detection

2. **clock/app.js**
   - Real-time clock updates
   - 12-hour format with AM/PM
   - Date and day display

3. **countdown-timer/app.js**
   - Pomodoro timer logic
   - Preset management (25, 15, 50 min)
   - Session counting
   - Break timer (5 min)
   - Progress ring animation

## Navigation System

Smart floating menu that:
- Shows theme toggle at top
- Shows navigation links below
- Hides current page link
- Adapts based on current URL

## Key Features by Page

### Homepage
- Card-based tool grid
- Hover effects with lift animation
- Gradient icon backgrounds
- Responsive layout

### Pomodoro Timer
- Three presets: Focus (25), Short (15), Deep (50)
- Circular progress indicator
- Session counter
- Automatic 5-minute breaks
- Start/Stop controls

### Digital Clock
- Large digital display
- Day of week
- Current date
- Real-time updates

## Development Guidelines

### Indentation
- **HTML, CSS, JS**: 4 spaces
- **JSON**: 2 spaces
- **Markdown**: 2 spaces

### Code Style
- Format on save enabled
- Trim trailing whitespace
- Unix line endings (LF)
- UTF-8 encoding

### Browser Testing
Test in: Chrome, Firefox, Safari, Edge

## Deployment

This is a static site that can be deployed to:
- GitHub Pages
- Netlify
- Vercel
- Any static hosting service

No build process required!

## Future Enhancements

Potential additions:
- [ ] Task list/todo manager
- [ ] Calculator
- [ ] Unit converter
- [ ] Stopwatch
- [ ] Notes app
- [ ] Weather widget

---

Last Updated: 2025-11-25