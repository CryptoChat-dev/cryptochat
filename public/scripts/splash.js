function switchTheme() {
    // switch from dark to light and vice-versa

    button = document.getElementById('toggler').innerText; // get the text value of the theme button

    if (button === 'LIGHT') {
        // if the button says 'dark', switch the page to light theme

        document.documentElement.setAttribute('data-theme', 'light');
        document.getElementById('toggler').innerText = 'DARK';
    } else {
        // otherwise, just switch the page to dark theme

        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('toggler').innerText = 'LIGHT';
    }
}

// bind the theme toggle button to switchTheme()
document.getElementById('toggler').addEventListener('click', switchTheme);
