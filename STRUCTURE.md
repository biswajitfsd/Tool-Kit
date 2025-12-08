# Project Structure Documentation

## Complete File Structure

```
TOOL-KIT/
│
├── .vscode/                          # VS Code workspace settings
│   ├── settings.json                 # Editor preferences (4-space indent, format on save)
│   ├── extensions.json               # Recommended VS Code extensions
│   └── keybindings.json              # JetBrains IDE keymap
│
├── tools/                            # All Tools Directory
│   ├── clock/                        # Digital Clock Tool
│   │   ├── app.js                    # Clock functionality (time display, updates)
│   │   ├── index.html                # Clock page HTML
│   │   └── style.css                 # Clock-specific styles
│   │
│   ├── countdown-timer/              # Pomodoro Timer Tool
│   │   ├── app.js                    # Timer logic (start, stop, presets, breaks)
│   │   ├── index.html                # Timer page HTML with circular progress
│   │   └── style.css                 # Timer-specific styles (card, buttons, progress ring)
│   │
│   └── todo/                         # Todo List Tool
│       ├── app.js                    # Todo list logic with localStorage
│       ├── index.html                # Todo list page HTML
│       └── style.css                 # Todo list styles
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
├── STRUCTURE.md                      # This file - project structure documentation
├── robots.txt                        # Search engine crawler rules
├── sitemap.xml                       # SEO sitemap
│
├── index.html                        # Homepage (tool cards, navigation)
├── index.js                          # Main JS (theme toggle, navigation logic)
│
├── common.css                        # Shared styles (colors, theme, menu, fonts)
└── home.css                          # Homepage-specific styles (cards, grid, animations)
```

## File Descriptions

### Root Files

| File            | Purpose                               |
| --------------- | ------------------------------------- |
| `index.html`    | Main landing page with tool cards     |
| `index.js`      | Theme management and smart navigation |
| `common.css`    | Shared styles across all pages        |
| `home.css`      | Homepage card grid and animations     |
| `sitemap.xml`   | SEO sitemap for search engines        |
| `robots.txt`    | Search engine crawler instructions    |
| `README.md`     | Project documentation                 |
| `STRUCTURE.md`  | Project structure documentation       |
| `.editorconfig` | Ensures consistent coding styles      |
| `.gitignore`    | Git version control ignore rules      |

### Tools Directory (`/tools/`)

All tools are organized in this directory, each with their own folder.

### Clock Directory (`/tools/clock/`)

| File         | Purpose                                     |
| ------------ | ------------------------------------------- |
| `index.html` | Digital clock interface with 12h/24h toggle |
| `app.js`     | Updates time display every second           |
| `style.css`  | Clock-specific styling with card design     |

### Countdown Timer Directory (`/tools/countdown-timer/`)

| File         | Purpose                                |
| ------------ | -------------------------------------- |
| `index.html` | Pomodoro timer with circular progress  |
| `app.js`     | Timer logic, presets, session tracking |
| `style.css`  | Modern card design with progress ring  |

### Todo List Directory (`/tools/todo/`)

| File         | Purpose                                       |
| ------------ | --------------------------------------------- |
| `index.html` | Todo list interface with filters              |
| `app.js`     | Task management with localStorage persistence |
| `style.css`  | Task list styling with animations             |

### VS Code Directory (`/.vscode/`)

| File               | Purpose                             |
| ------------------ | ----------------------------------- |
| `settings.json`    | 4-space indentation, format on save |
| `extensions.json`  | Recommended extensions list         |
| `keybindings.json` | JetBrains IDE keymap for VS Code    |

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
    --primary-colour: #4e4d4d; /* Main text color */
    --body-bg: rgba(0, 0, 0, 0); /* Background */
    --card-bg: #ffffff; /* Card background */
    --accent-color: #4a90e2; /* Primary accent */
    --text-secondary: #6c757d; /* Secondary text */
    --border-color: #e0e0e0; /* Borders */
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

-   Shows theme toggle at top
-   Shows navigation links below
-   Hides current page link
-   Adapts based on current URL

## Key Features by Tool

### Homepage

-   Card-based tool grid
-   Hover effects with lift animation
-   Gradient icon backgrounds (12 unique colors)
-   Responsive layout
-   Smart navigation menu

### Pomodoro Timer

-   Three presets: Focus (25), Short (15), Deep (50)
-   Circular progress indicator
-   Session counter
-   Automatic 5-minute breaks
-   Start/Stop controls (no pause)

### Digital Clock

-   Large digital display
-   12h/24h format toggle
-   Day of week display
-   Current date display
-   Real-time updates every second

### Todo List

-   Add, edit, delete tasks
-   Mark tasks as complete
-   Filter by: All, Active, Completed
-   Task statistics (total, completed, pending)
-   localStorage persistence
-   Clear completed/all tasks

## Development Guidelines

### Indentation

-   **HTML, CSS, JS**: 4 spaces
-   **JSON**: 2 spaces
-   **Markdown**: 2 spaces

### Code Style

-   Format on save enabled
-   Trim trailing whitespace
-   Unix line endings (LF)
-   UTF-8 encoding

### Browser Testing

Test in: Chrome, Firefox, Safari, Edge

## Deployment

This is a static site that can be deployed to:

-   GitHub Pages
-   Netlify
-   Vercel
-   Any static hosting service

No build process required!

## 🗺️ Tools Roadmap

### ✅ Available Tools (4):

-   **Pomodoro Timer** - Focus timer with presets (25/15/50 min) and automatic breaks
-   **Digital Clock** - 12h/24h format toggle with date and day display
-   **Todo List** - Task manager with filters, statistics, and localStorage persistence
-   **Password Generator** - Strong password creation with customizable options

### 🚧 In Development (9):

1. **Stopwatch** - Lap time tracking and split times
2. **Calculator** - Basic and scientific operations
3. **Unit Converter** - Length, weight, temperature, currency, speed, area, volume
4. **BMI Calculator** - Body mass index with weight categories
5. **Breathing Exercise** - Guided breathing techniques (4-7-8, box breathing)
6. **URL Encoder/Decoder** - Safe URL encoding and decoding utility
7. **JSON Formatter** - Format, validate, minify, and beautify JSON data
8. **Base64 Encoder/Decoder** - Base64 encoding and decoding for text and files
9. **SQL Formatter** - MySQL/PostgreSQL query formatting and validation

### 💡 Future Considerations:

-   World Clock - Multiple timezone display
-   Alarm Clock - Set multiple alarms with custom sounds
-   Notes App - Quick note-taking with markdown support
-   Markdown Preview - Live markdown editor with preview
-   Color Picker - HEX, RGB, HSL codes with palette generator
-   QR Code Generator - Generate QR codes for URLs, text, WiFi
-   Text Case Converter - UPPERCASE, lowercase, Title Case, camelCase
-   Word Counter - Count words, characters, reading time
-   Age Calculator - Calculate exact age and days until birthday
-   Date Calculator - Days between dates, add/subtract days
-   Tip Calculator - Calculate tips and split bills
-   Percentage Calculator - Various percentage calculations
-   Dice Roller - Roll multiple dice with statistics
-   Random Number Generator - Generate random numbers with constraints
-   Decision Maker - Random picker with wheel spinner animation

---

Last Updated: 2025-11-25
