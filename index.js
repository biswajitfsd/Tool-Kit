const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
var r = document.querySelector(':root');
darkThemeMq.addListener(e => {
    if (e.matches) {
        // Theme set to dark.
        r.style.setProperty('--primary-colour', '#fefefe');
    } else {
        // Theme set to light.
        r.style.setProperty('--primary-colour', "#4e4d4d");
    }
});