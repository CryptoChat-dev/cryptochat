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

function getWordNum() {
    var wordslist = []
    for (var i = 0; i < 6; i += 1) {
        var newnum = []
        for (var j = 0; j < 5; j += 1) {
            // roll a 6 sided die
            newnum.push(secureRandom(6) + 1)
        }
        var theword = eff[newnum.join('')]
        wordslist.push(theword.charAt(0).toUpperCase() + theword.slice(1))
    document.getElementById("key").value = wordslist.join('')
    }
}

function secureRandom (count) {
    var cryptoObj = window.crypto || window.msCrypto
    var rand = new Uint32Array(1)
    var skip = 0x7fffffff - 0x7fffffff % count
    var result
    
    if (((count - 1) & count) === 0) {
        cryptoObj.getRandomValues(rand)
        return rand[0] & (count - 1)
    }
    
    do {
        cryptoObj.getRandomValues(rand)
        result = rand[0] & 0x7fffffff
    } while (result >= skip)
    
    return result % count
    }

function loadChat(username, key) {
    window.open(window.location.href + "chat/?key=" + key + "&username=" + username,"_self")
}

document.getElementById('randomizer').addEventListener("click", function(){getWordNum()});
document.getElementById('join').addEventListener("click", function(){loadChat(document.getElementById('msg').value, document.getElementById('key').value)});
