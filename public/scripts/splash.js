// Registering our Service worker

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(
            function (registration) {
                // Registration was successful
                console.log(
                    'ServiceWorker registration successful with scope: ',
                    registration.scope
                );
            },
            function (err) {
                // Registration Failed :(
                console.log('ServiceWorker registration failed: ', err);
            }
        );
    });
}

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
    // get the random words from the dice ware dict
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
    // generate a cryptographically secure integer
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


document.getElementById('randomizer').addEventListener("click", function(){getWordNum()});
document.getElementById('join').addEventListener("click", function(){loadChat(document.getElementById('msg').value, document.getElementById('key').value)});

var Alert = new CustomAlert();

function CustomAlert(){
    this.render = function(){
        //Show Modal
        let popUpBox = document.getElementById('popUpBox');
        popUpBox.style.display = "block";
        document.getElementById('content').style.filter = 'blur(10px)';

        //Close Modal
        if (document.getElementById('proceedLeave').children.length === 0) {
            confirmbutton = document.createElement('button');
            confirmbutton.className = 'modalButton-red';
            confirmbutton.appendChild(document.createTextNode('Yes'));
            confirmbutton.onclick = function () {loadChat(document.getElementById('msg').value, document.getElementById('key').value, true)};
            cancelbutton = document.createElement('button');
            cancelbutton.className = 'modalButton';
            cancelbutton.appendChild(document.createTextNode('No'));
            cancelbutton.onclick = Alert.ok;
            document.getElementById('proceedLeave').appendChild(confirmbutton);
            document.getElementById('cancelLeave').appendChild(cancelbutton);
        }
    }
    
    this.ok = function(){
        document.getElementById('popUpBox').style.display = "none";
        document.getElementById('popUpOverlay').style.display = "none";
        document.getElementById('content').style.filter = 'none'
        
    }
}

function renderAlert(){
    Alert.render('You look very pretty today.')
}

function checkValues() {
    if (document.getElementById("msg").value == "" || document.getElementById("key") != "") {
        return false
    }
}

function loadChat(username, key, override = false) {
    if (toWords(scorePassword(key)) == "weak" && override == false) {
        renderAlert()
    } else {
        // load the chat by giving the key and username to the chat route endpoint 
        window.open(window.location.href + "chat/?key=" + key + "&username=" + username,"_self")
    }
}
