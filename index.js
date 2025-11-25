var r = document.querySelector(':root');
var body = document.querySelector('body');

// Function to apply theme
function applyTheme(isDark) {
    if (isDark) {
        r.style.setProperty('--primary-colour', '#fefefe');
        r.style.setProperty('--body-bg', 'rgba(0, 0, 0, 0)');
        r.style.setProperty('--card-bg', 'rgba(30, 30, 30, 0.8)');
        r.style.setProperty('--card-shadow', 'rgba(0, 0, 0, 0.3)');
        r.style.setProperty('--card-hover-shadow', 'rgba(0, 0, 0, 0.5)');
        r.style.setProperty('--text-secondary', '#b0b0b0');
        r.style.setProperty('--border-color', '#404040');
        body.classList.add('dark-mode');
        document.documentElement.style.setProperty('color-scheme', 'dark');
    } else {
        r.style.setProperty('--primary-colour', '#4e4d4d');
        r.style.setProperty('--body-bg', '#fefefe');
        r.style.setProperty('--card-bg', '#ffffff');
        r.style.setProperty('--card-shadow', 'rgba(0, 0, 0, 0.1)');
        r.style.setProperty('--card-hover-shadow', 'rgba(0, 0, 0, 0.2)');
        r.style.setProperty('--text-secondary', '#6c757d');
        r.style.setProperty('--border-color', '#e0e0e0');
        body.classList.remove('dark-mode');
        document.documentElement.style.setProperty('color-scheme', 'light');
    }
}

// Function to check if the system theme is dark
function checkSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme(true);
        return 'dark';
    } else {
        applyTheme(false);
        return 'light';
    }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
    const systemTheme = checkSystemTheme();
    
    // Set toggle checkbox to match current theme
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.checked = (systemTheme === 'dark');
    }
});

// Listen for changes in the system theme
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Function to handle the change event
function handleThemeChange(event) {
    const themeToggle = document.getElementById('themeToggle');
    if (event.matches) {
        applyTheme(true);
        if (themeToggle) themeToggle.checked = true;
    } else {
        applyTheme(false);
        if (themeToggle) themeToggle.checked = false;
    }
}

// Add the event listener
if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', handleThemeChange);
} else {
    mediaQuery.addListener(handleThemeChange);
}

// Manual theme toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            applyTheme(this.checked);
        });
    }
    
    // Hide current page from floating menu
    hideCurrentPageLink();
});

// Function to hide the current page link from floating menu
function hideCurrentPageLink() {
    const currentPath = window.location.pathname;
    const floatingNav = document.getElementById('floatingNav');
    
    if (!floatingNav) return;
    
    const links = floatingNav.querySelectorAll('a');
    
    links.forEach(link => {
        const dataPage = link.getAttribute('data-page');
        
        // Normalize current path
        const normalizedPath = currentPath.toLowerCase().replace(/\\/g, '/');
        
        // Determine which page we're on
        let isCurrentPage = false;
        
        // Check for home page (only if NOT on countdown or clock pages)
        if (dataPage === 'home') {
            if (!normalizedPath.includes('countdown-timer') && !normalizedPath.includes('clock')) {
                isCurrentPage = true;
            }
        } 
        // Check for countdown page
        else if (dataPage === 'countdown') {
            if (normalizedPath.includes('countdown-timer')) {
                isCurrentPage = true;
            }
        } 
        // Check for clock page
        else if (dataPage === 'clock') {
            if (normalizedPath.includes('clock') && !normalizedPath.includes('countdown')) {
                isCurrentPage = true;
            }
        }
        
        // Hide if it's the current page, show if it's not
        if (isCurrentPage) {
            link.style.display = 'none';
        } else {
            link.style.display = 'flex';
        }
    });
}