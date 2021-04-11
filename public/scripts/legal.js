function switchTheme(e) {
    button = document.getElementById('toggler').innerText;
    console.log(button);
    
    if (button === 'DARK'){
        console.log('yes');
        document.documentElement.setAttribute('data-theme','light');
        document.getElementById('toggler').innerText = 'LIGHT';
        
    } else {
        document.documentElement.setAttribute('data-theme','dark');
        document.getElementById('toggler').innerText = 'DARK';
    }
}

document.getElementById("toggler").addEventListener("click", switchTheme);

