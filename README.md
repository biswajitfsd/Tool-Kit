# Tool Kit - Productivity Tools Collection

A collection of useful web-based productivity tools including a Pomodoro timer and digital clock.

## 🚀 Features

- **Pomodoro Timer**: Focus timer with presets and break management
- **Digital Clock**: Clean digital time display with date
- **Responsive Design**: Works on all devices
- **Dark Mode**: Toggle between light and dark themes
- **Modern UI**: Card-based design with smooth animations

## 📁 Project Structure

```
tool-kit/
├── .vscode/              # VS Code settings
│   ├── settings.json     # Editor configuration
│   └── extensions.json   # Recommended extensions
├── clock/                # Digital clock page
│   ├── app.js           # Clock logic
│   ├── index.html       # Clock HTML
│   └── style.css        # Clock styles (optional)
├── countdown-timer/      # Pomodoro timer page
│   ├── app.js           # Timer logic
│   ├── index.html       # Timer HTML
│   └── style.css        # Timer styles
├── fonts/               # Custom fonts
│   └── ds_digital/      # Digital font family
│       ├── DS-DIGI.TTF
│       ├── DS-DIGIB.TTF
│       ├── DS-DIGII.TTF
│       └── DS-DIGIT.TTF
├── common.css           # Shared styles (theme, menu, etc.)
├── home.css             # Homepage specific styles
├── clock.css            # Clock specific styles
├── countdown.css        # Timer specific styles
├── index.html           # Homepage
├── index.js             # Main JavaScript (theme, navigation)
├── style.css            # Legacy/backup styles
├── sitemap.xml          # SEO sitemap
├── favicon.ico          # Site icon
├── .editorconfig        # Editor configuration
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🛠️ Setup

1. Clone or download the repository
2. Open `index.html` in your browser
3. No build process required - pure HTML/CSS/JS

### VS Code Setup

This project includes VS Code settings for optimal development experience:
- 4-space indentation
- Format on save
- Recommended extensions

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
Edit preset values in `countdown-timer/app.js`:
```javascript
timer.setPreset(25, 'Focus Time')  // Change minutes
```

## 🌐 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to fork, modify, and submit pull requests!

## 📧 Contact

For issues or suggestions, please open an issue on the repository.

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript