# Tool Kit - Productivity Tools Collection

A collection of useful web-based productivity tools including a Pomodoro timer and digital clock.

## 🚀 Features

-   **Pomodoro Timer**: Focus timer with presets (25/15/50 min) and break management
-   **Digital Clock**: Clean digital time display with 12h/24h toggle
-   **Todo List**: Task manager with filters and localStorage persistence
-   **Responsive Design**: Works on all devices
-   **Dark Mode**: Toggle between light and dark themes
-   **Modern UI**: Card-based design with smooth animations
-   **Smart Navigation**: Floating menu with context-aware links

## 📁 Project Structure

```
tool-kit/
├── .vscode/              # VS Code settings
│   ├── settings.json     # Editor configuration
│   ├── extensions.json   # Recommended extensions
│   └── keybindings.json  # JetBrains IDE keymap
├── tools/                # All tools directory
│   ├── clock/            # Digital clock page
│   │   ├── app.js        # Clock logic
│   │   ├── index.html    # Clock HTML
│   │   └── style.css     # Clock styles
│   ├── countdown-timer/  # Pomodoro timer page
│   │   ├── app.js        # Timer logic
│   │   ├── index.html    # Timer HTML
│   │   └── style.css     # Timer styles
│   └── todo/             # Todo list page
│       ├── app.js        # Todo logic
│       ├── index.html    # Todo HTML
│       └── style.css     # Todo styles
├── fonts/                # Custom fonts
│   └── ds_digital/       # Digital font family
│       ├── DS-DIGI.TTF
│       ├── DS-DIGIB.TTF
│       ├── DS-DIGII.TTF
│       └── DS-DIGIT.TTF
├── common.css            # Shared styles (theme, menu, etc.)
├── home.css              # Homepage specific styles
├── index.html            # Homepage
├── index.js              # Main JavaScript (theme, navigation)
├── sitemap.xml           # SEO sitemap
├── favicon.ico           # Site icon
├── .editorconfig         # Editor configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## 🛠️ Setup

1. Clone or download the repository
2. Open `index.html` in your browser
3. No build process required - pure HTML/CSS/JS

### VS Code Setup

This project includes VS Code settings for optimal development experience:

-   4-space indentation
-   Format on save
-   Recommended extensions

Install recommended extensions when prompted by VS Code.

## 🎨 Customization

### Colors

Edit CSS variables in `common.css`:

```css
:root {
    --primary-colour: #4e4d4d;
    --accent-color: #4a90e2;
    --card-bg: #ffffff;
    /* ... */
}
```

### Timer Presets

Edit preset values in `tools/countdown-timer/app.js`:

```javascript
timer.setPreset(25, 'Focus Time'); // Change minutes
```

## 🌐 Browser Support

-   Chrome (recommended)
-   Firefox
-   Safari
-   Edge

## 🗺️ Tools Roadmap

### ✅ Available Tools:

-   **Pomodoro Timer** - Focus timer with presets and breaks
-   **Digital Clock** - 12h/24h format with date display
-   **Todo List** - Task manager with localStorage

### 🚧 In Development:

-   **Stopwatch** - Lap time tracking and split times
-   **Calculator** - Basic and scientific operations
-   **Password Generator** - Strong password creation tool
-   **Unit Converter** - Length, weight, temperature, currency
-   **BMI Calculator** - Body mass index calculation
-   **Breathing Exercise** - Guided breathing techniques (4-7-8, box breathing)
-   **URL Encoder/Decoder** - Safe URL encoding and decoding
-   **JSON Formatter** - Format, validate, and beautify JSON
-   **Base64 Encoder/Decoder** - Base64 encoding and decoding
-   **SQL Formatter** - MySQL/PostgreSQL query formatting

### 💡 Future Considerations:

-   World Clock (Multiple timezones)
-   Notes App (Quick note-taking with markdown)
-   Color Picker (HEX, RGB, HSL codes)
-   QR Code Generator
-   Text Case Converter
-   Word Counter & Reading Time
-   Age Calculator
-   Markdown Preview

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and submit pull requests!

## 📧 Contact

For issues or suggestions, please open an issue on the repository.

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript
