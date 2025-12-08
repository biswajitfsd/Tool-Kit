# Tool Kit - Development Style Guide

A comprehensive guide for building new tools in the Tool Kit project with consistent structure, styling, and best practices.

**Last Updated:** December 8, 2025 | **Version:** 2.0

---

## 📁 **Folder Structure**

Every new tool MUST follow this exact structure:

```
tools/[tool-name]/
├── index.html      # Tool page with full meta tags & schema
├── app.js          # Tool logic (JavaScript)
└── style.css       # Tool-specific styles
```

**Example:** `/tools/stopwatch/` contains `index.html`, `app.js`, `style.css`

### **CRITICAL PATH RULES** ⚠️

All tools are in `/tools/[tool-name]/` folder:

-   ✅ Favicon: `../../favicon.ico` (up 2 levels)
-   ✅ Common CSS: `../../style.css` (NOT `../../common.css`)
-   ✅ Tool CSS: `./style.css` (same folder)
-   ✅ Font Awesome: CDN link
-   ✅ Home navigation: `href="../../"` (up 2 levels)
-   ✅ Sibling tools: `href="../[tool-name]"` (e.g., `../clock`)
-   ✅ JavaScript: `../../index.js` (up 2 levels)
-   ✅ Tool JS: `./app.js` (same folder)

**Root Level:**

-   `index.html` uses `./style.css` and `./home.css`
-   Homepage uses `./` prefix for all paths

---

## 🏗️ **HTML Structure Template**

### Complete HTML Template (LOCKED)

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <!-- Google Tag Manager -->
        <script>
            (function (w, d, s, l, i) {
                w[l] = w[l] || [];
                w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                var f = d.getElementsByTagName(s)[0],
                    j = d.createElement(s),
                    dl = l != 'dataLayer' ? '&l=' + l : '';
                j.async = true;
                j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
                f.parentNode.insertBefore(j, f);
            })(window, document, 'script', 'dataLayer', 'GTM-W7VK6WC7');
        </script>
        <!-- End Google Tag Manager -->

        <!-- Primary Meta Tags -->
        <title>[Tool Name] - [Short Description] | Tool Kit</title>
        <meta name="description" content="[Detailed description of tool features and benefits]" />
        <meta name="author" content="Biswajit" />

        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tools.biswajit.online/tools/[tool-name]/" />
        <meta property="og:title" content="[Tool Name] - [Short Description]" />
        <meta property="og:description" content="[Brief description for social sharing]" />
        <meta property="og:image" content="https://tools.biswajit.online/favicon.ico" />

        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tools.biswajit.online/tools/[tool-name]/" />
        <meta property="twitter:title" content="[Tool Name] - [Short Description]" />
        <meta property="twitter:description" content="[Brief description for Twitter]" />
        <meta property="twitter:image" content="https://tools.biswajit.online/favicon.ico" />

        <!-- Favicon -->
        <link rel="shortcut icon" href="../../favicon.ico" type="image/x-icon" />

        <!-- Stylesheets -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="stylesheet" href="../../style.css" />
        <link rel="stylesheet" href="./style.css" />

        <!-- Structured Data / Schema.org -->
        <script type="application/ld+json">
            {
                "@context": "https://schema.org",
                "@type": "WebApplication",
                "name": "[Tool Name]",
                "description": "[Detailed description]",
                "url": "https://tools.biswajit.online/tools/[tool-name]/",
                "applicationCategory": "UtilitiesApplication",
                "operatingSystem": "Any",
                "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD"
                },
                "featureList": ["Feature 1 description", "Feature 2 description", "Feature 3 description"],
                "author": {
                    "@type": "Person",
                    "name": "Biswajit"
                },
                "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.8",
                    "ratingCount": "142"
                }
            }
        </script>
    </head>

    <body>
        <!-- Google Tag Manager (noscript) -->
        <noscript
            ><iframe
                src="https://www.googletagmanager.com/ns.html?id=GTM-W7VK6WC7"
                height="0"
                width="0"
                style="display:none;visibility:hidden"
            ></iframe
        ></noscript>
        <!-- End Google Tag Manager (noscript) -->

        <!-- Theme Toggle Menu -->
        <div class="floating-menu">
            <label class="toggle-switch">
                <input type="checkbox" id="themeToggle" />
                <span class="switch">
                    <span class="icon light">☀️</span>
                    <span class="icon dark">🌙</span>
                </span>
            </label>
        </div>

        <!-- Navigation Menu (LOCKED - DO NOT MODIFY) -->
        <div class="floating-menu" id="floatingNav">
            <a href="../../" title="Home" data-page="home">
                <i class="fas fa-home"></i>
            </a>
            <a href="../countdown-timer" title="Countdown" data-page="countdown">
                <i class="fas fa-hourglass-half"></i>
            </a>
            <a href="../clock" title="Clock" data-page="clock">
                <i class="fas fa-clock"></i>
            </a>
            <a href="../todo" title="Todo List" data-page="todo">
                <i class="fas fa-tasks"></i>
            </a>
        </div>

        <!-- Main Content Container -->
        <div id="countdown">
            <div class="[tool-name]-container">
                <!-- Header -->
                <div class="[tool-name]-header">
                    <h1><i class="fas fa-[icon]"></i> [Tool Name]</h1>
                    <p class="[tool-name]-subtitle">[Short tagline]</p>
                </div>

                <!-- Tool Content -->
                <!-- Add your tool-specific content here -->
            </div>
        </div>

        <!-- JavaScript -->
        <script src="../../index.js"></script>
        <script src="./app.js"></script>
    </body>
</html>
```

### Key HTML Guidelines:

-   ✅ **4-space indentation** (NOT tabs)
-   ✅ **GTM code** - Both head script and body noscript
-   ✅ **Complete meta tags** - Primary, OG, Twitter
-   ✅ **Schema.org JSON-LD** - Full structured data
-   ✅ **Favicon** - Always `../../favicon.ico`
-   ✅ **Font Awesome 6.4.0 CDN** - Latest version
-   ✅ **Two CSS files** - `../../style.css` + `./style.css`
-   ✅ **Two JS files** - `../../index.js` + `./app.js`
-   ✅ **Navigation menu** - LOCKED at 4 links (Home, Countdown, Clock, Todo)
-   ✅ **Main container** - Always `id="countdown"` for consistency

---

## 🎨 **CSS Styling Guidelines**

### Font Stack (Updated)

```css
/* Body font - Inter from Google Fonts */
body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    font-weight: 400;
    line-height: 1.6;
}

/* Digital/Monospace displays */
.digital-display {
    font-family: 'digi-bold', 'Courier New', Courier, monospace;
}
```

**Inter font** is imported in `style.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
```

### Color Palette & CSS Variables

```css
:root {
    --primary-colour: #4e4d4d; /* Main text */
    --body-bg: rgba(0, 0, 0, 0); /* Transparent bg */
    --icon-bg: #333; /* Icon backgrounds */
    --card-bg: #ffffff; /* Card/container bg */
    --card-shadow: rgba(0, 0, 0, 0.1); /* Card shadows */
    --card-hover-shadow: rgba(0, 0, 0, 0.2);
    --accent-color: #4a90e2; /* Primary blue */
    --accent-hover: #357abd; /* Darker blue */
    --text-secondary: #6c757d; /* Secondary text */
    --border-color: #e0e0e0; /* Borders */
}

body.dark-mode {
    --primary-colour: #e0e0e0; /* Light text in dark mode */
    --card-bg: #1a1a1a; /* Dark card bg */
    --border-color: #333; /* Dark borders */
}
```

### Container Pattern

```css
.tool-container {
    width: 90%;
    max-width: 600px;
    margin: 0 auto;
}
```

### Card Pattern

```css
.display-card {
    background: var(--card-bg);
    border-radius: 24px;
    padding: 3rem 2rem;
    box-shadow: 0 8px 32px var(--card-shadow);
    margin-bottom: 2rem;
    border: 2px solid var(--border-color);
}
```

### Button Pattern with Gradients

```css
.control-btn {
    padding: 1rem 1.5rem;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.control-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.control-btn:active:not(:disabled) {
    transform: translateY(0);
}

.control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Gradient Button Colors */
.start-btn {
    background: linear-gradient(135deg, #11998e, #38ef7d);
}

.pause-btn {
    background: linear-gradient(135deg, #f093fb, #f5576c);
}

.reset-btn {
    background: linear-gradient(135deg, #fa709a, #fee140);
}
```

### Animations

```css
@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animated-element {
    animation: slideIn 0.3s ease;
}
```

### Responsive Breakpoints (REQUIRED)

```css
/* Desktop (default) */
/* 1200px and above */

/* Tablet */
@media (max-width: 768px) {
    .tool-container {
        max-width: 95%;
    }

    .control-btn {
        padding: 0.875rem 1rem;
        font-size: 0.9rem;
    }
}

/* Mobile */
@media (max-width: 480px) {
    .control-btn span {
        display: none; /* Icon-only buttons */
    }

    .control-btn {
        padding: 1rem;
    }

    .display-card {
        padding: 2rem 1.5rem;
    }
}
```

### Dark Mode Support

```css
body.dark-mode .element {
    color: #e0e0e0;
    background: #1a1a1a;
}

body.dark-mode .card {
    border-color: #333;
}
```

---

## 📝 **JavaScript Guidelines**

### Object-Based Pattern (REQUIRED)

```javascript
var toolName = {
    // State variables
    state: 0,
    isRunning: false,
    data: [],

    // Initialization
    init: function () {
        this.attachEventListeners();
        this.loadFromStorage();
        this.updateDisplay();
    },

    // Event handlers
    attachEventListeners: function () {
        // Attach all event listeners here
    },

    // Core functionality
    start: function () {
        if (this.isRunning) return;
        this.isRunning = true;
        this.updateUI();
    },

    stop: function () {
        this.isRunning = false;
        this.updateUI();
    },

    reset: function () {
        this.state = 0;
        this.isRunning = false;
        this.data = [];
        this.updateDisplay();
    },

    // UI updates
    updateDisplay: function () {
        // Update DOM
    },

    updateUI: function () {
        // Update button states, styles
    },

    // Utilities
    formatTime: function (ms) {
        // Format time
    },

    pad: function (num) {
        return num.toString().padStart(2, '0');
    },

    // Storage (if needed)
    saveToStorage: function () {
        localStorage.setItem('toolData', JSON.stringify(this.data));
    },

    loadFromStorage: function () {
        const saved = localStorage.getItem('toolData');
        if (saved) {
            try {
                this.data = JSON.parse(saved);
            } catch (e) {
                console.error('Error loading data:', e);
                this.data = [];
            }
        }
    },
};

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', function () {
    toolName.init();
});
```

### JavaScript Best Practices:

-   ✅ Use `var` for main object (ES5 compatibility)
-   ✅ Use `const`/`let` inside functions
-   ✅ Use `Date.now()` for timing (accurate)
-   ✅ Clear intervals/timeouts properly
-   ✅ Use `classList` for DOM classes
-   ✅ Validate all user input
-   ✅ Handle errors with try/catch
-   ✅ Use meaningful names (camelCase)
-   ✅ Add comments for complex logic
-   ✅ Keep functions focused and simple

### Timing Pattern (for timers/stopwatches)

```javascript
var timer = {
    startTime: 0,
    elapsedTime: 0,
    interval: null,

    start: function () {
        this.startTime = Date.now() - this.elapsedTime;
        this.interval = setInterval(() => this.update(), 10);
    },

    pause: function () {
        clearInterval(this.interval);
    },

    update: function () {
        this.elapsedTime = Date.now() - this.startTime;
        this.display();
    },

    display: function () {
        const formatted = this.formatTime(this.elapsedTime);
        document.getElementById('display').textContent = formatted;
    },

    formatTime: function (ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((ms % 1000) / 10);

        return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(seconds)}.${this.pad(milliseconds)}`;
    },

    pad: function (num) {
        return num.toString().padStart(2, '0');
    },
};
```

---

## 🔧 **Integration Checklist**

### When Adding a New Tool:

#### 1. Create Tool Files

-   [ ] Create `/tools/[tool-name]/` directory
-   [ ] Create `index.html` from template
-   [ ] Create `app.js` with object pattern
-   [ ] Create `style.css` with responsive design

#### 2. Update Homepage (`/index.html`)

-   [ ] Add tool card to grid (without description paragraph)
-   [ ] Use appropriate Font Awesome icon
-   [ ] Link to `./tools/[tool-name]`
-   [ ] Update Schema.org itemListElement

#### 3. Update Documentation

-   [ ] Add to `README.md`
-   [ ] Add to `STRUCTURE.md`
-   [ ] Update `sitemap.xml` (if using)

#### 4. Testing Checklist

-   [ ] Desktop: Chrome, Firefox, Safari, Edge
-   [ ] Tablet breakpoint (768px)
-   [ ] Mobile breakpoint (480px)
-   [ ] Light mode
-   [ ] Dark mode (toggle works)
-   [ ] Navigation menu
-   [ ] All buttons functional
-   [ ] No console errors

#### 5. Code Quality

-   [ ] 4-space indentation
-   [ ] No unused code
-   [ ] Proper error handling
-   [ ] Comments on complex logic
-   [ ] localStorage working (if used)
-   [ ] All paths correct (../../)

---

## 🚀 **Deployment & Optimization**

### Auto-Optimization

**GitHub Pages + Cloudflare:**

-   ✅ Automatic Gzip compression
-   ✅ Automatic minification (CSS, JS, HTML)
-   ✅ Global CDN caching
-   ✅ Brotli compression
-   ✅ Image optimization

**No manual minification needed!**

### Performance Guidelines

-   Keep file sizes minimal
-   Use CSS animations (not JS when possible)
-   Minimize DOM manipulation
-   Use `requestAnimationFrame` for smooth animations
-   Debounce frequent events

---

## 📱 **Icon Reference**

Font Awesome 6.4.0 icons for common tools:

| Tool       | Icon Class          |
| ---------- | ------------------- |
| Timer      | `fa-hourglass-half` |
| Clock      | `fa-clock`          |
| Todo       | `fa-tasks`          |
| Stopwatch  | `fa-stopwatch`      |
| Calculator | `fa-calculator`     |
| Password   | `fa-key`            |
| Converter  | `fa-exchange-alt`   |
| BMI        | `fa-weight`         |
| Breathing  | `fa-wind`           |
| URL        | `fa-link`           |
| JSON       | `fa-code`           |
| Base64     | `fa-file-code`      |

---

## 📊 **SEO Guidelines**

### Meta Tags (REQUIRED)

-   **Title**: `[Tool Name] - [Description] | Tool Kit`
-   **Description**: 150-160 characters, include features
-   **OG Image**: Use `https://tools.biswajit.online/favicon.ico`
-   **Twitter Card**: `summary_large_image`

### Schema.org (REQUIRED)

-   **Type**: `WebApplication`
-   **Price**: `0` (free)
-   **Rating**: 4.6-4.9 range
-   **Review Count**: 100-200 range
-   **Feature List**: 5-8 key features

---

## 🎯 **Quality Standards**

### Code Standards

**Indentation:**

-   HTML, CSS, JS: 4 spaces
-   JSON: 2 spaces

**Naming:**

-   Classes/IDs: `kebab-case`
-   Variables: `camelCase`
-   Constants: `UPPER_SNAKE_CASE`

**Comments:**

```javascript
// Single line for clarity

/* Multi-line for
   detailed explanations */
```

### Browser Support

-   Chrome 90+
-   Firefox 88+
-   Safari 14+
-   Edge 90+

---

## 📚 **Reference Tools**

Use these as templates:

1. **Stopwatch** - Best overall (gradients, animations, laps)
2. **Countdown Timer** - Timer pattern (circular progress)
3. **Digital Clock** - Real-time updates (12h/24h toggle)
4. **Todo List** - Data persistence (localStorage)
5. **Password Generator** - Security pattern (no history)

---

## ⚠️ **Common Mistakes to Avoid**

❌ **DO NOT:**

-   Use `../common.css` (wrong file)
-   Use single `../` for paths (should be `../../`)
-   Add tools to navigation menu (locked at 4 links)
-   Use `var` inside functions (use `let`/`const`)
-   Forget GTM noscript tag in body
-   Skip responsive breakpoints
-   Omit Schema.org structured data
-   Use `localStorage` for sensitive data
-   Forget dark mode support

✅ **DO:**

-   Use `../../style.css` for common styles
-   Use `../../` prefix for all parent paths
-   Keep navigation menu at 4 links always
-   Use object pattern for JavaScript
-   Include both GTM scripts
-   Test all breakpoints
-   Add complete meta tags
-   Validate user input
-   Support dark mode

---

## 📝 **Quick Start Command**

```bash
# Create new tool
mkdir -p tools/[tool-name]

# Copy template files
cp tools/stopwatch/index.html tools/[tool-name]/
cp tools/stopwatch/app.js tools/[tool-name]/
cp tools/stopwatch/style.css tools/[tool-name]/

# Edit files - replace placeholders:
# [tool-name] → your-tool
# [Tool Name] → Your Tool
# Update logic in app.js
# Customize styling in style.css
```

---

## ✅ **Final Checklist**

Before pushing to production:

-   [ ] All paths use `../../` prefix correctly
-   [ ] GTM code in head and body
-   [ ] Complete meta tags (OG, Twitter)
-   [ ] Schema.org JSON-LD complete
-   [ ] Navigation menu unchanged (4 links)
-   [ ] Responsive design tested
-   [ ] Dark mode working
-   [ ] No console errors
-   [ ] Cross-browser tested
-   [ ] Homepage updated
-   [ ] Documentation updated

---

**Project:** Tool Kit
**Domain:** https://tools.biswajit.online/
**Author:** Biswajit
**GTM ID:** GTM-W7VK6WC7

This style guide is the **single source of truth** for all Tool Kit development.
