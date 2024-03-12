var r = document.querySelector(':root');
var body = document.querySelector('body');

// Function to check if the system theme is dark
function checkSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // System theme is dark
        r.style.setProperty('--primary-colour', '#fefefe');
        body.style.setProperty('--body-bg', '#4e4d4d');
        updateTheme(true);
        return 'dark';
    } else {
        // System theme is light or not specified
        r.style.setProperty('--primary-colour', "#4e4d4d");
        body.style.setProperty('--body-bg', '#fefefe');
        updateTheme(false);
        return 'light';
    }
}

// Call the function to check the system theme
const systemTheme = checkSystemTheme();
console.log(systemTheme); // Output will be 'dark' or 'light'
// Listen for changes in the system theme
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

// Function to handle the change event
function handleThemeChange(event) {
    if (event.matches) {
        r.style.setProperty('--primary-colour', '#fefefe');
        body.style.setProperty('--body-bg', '#4e4d4d');
        updateTheme(true);
    } else {
        r.style.setProperty('--primary-colour', "#4e4d4d");
        body.style.setProperty('--body-bg', '#fefefe');
        updateTheme(false);
    }
}

// Add the event listener
mediaQuery.addListener(handleThemeChange);

// Initial check
handleThemeChange(mediaQuery);


function updateTheme(checked) {
    if (checked) {
        r.style.setProperty('--primary-colour', '#fefefe');
        body.style.setProperty('--body-bg', '#4e4d4d');
        document.getElementById('themeToggle').checked = true;
    } else {
        r.style.setProperty('--primary-colour', "#4e4d4d");
        body.style.setProperty('--body-bg', '#fefefe');
        document.getElementById('themeToggle').checked = false;
    }
}

document.getElementById('themeToggle').addEventListener('change', function () {
    updateTheme(this.checked);
});
