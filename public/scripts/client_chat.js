function checkCommands() {
    // get message and split the individual words into an array
    var message = document.getElementById("msg").value;
    var args = message.split(" ");
    
    // switch for command
    switch (args[0]) {
        case "/nick":
            if (args.length == 1) {
                window.alert("Invalid nickname. Correct usage: /nick <username>");
    
            } else {
                socket.emit('chat event', {
                    user_name : code.encryptMessage(user_name, decryptPass),  
                    message : code.encryptMessage("changed their username to " + args[1], decryptPass)
                });
        
                $('input.message').val( '' ).focus();
                var user_name = args[1];
                window.alert("Nickname changed to " + args[1]);
            }
    
            break;
            
        case "/leave":
            location.reload();
            break;
            
        default:
            form2();
    }
}

// Registering our Service worker

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker.register('/sw.js').then(function (registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);

        }, function (err) {
            // Registration Failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}

var user_name = prompt('Username:', '');
var decryptPass = prompt('Encryption Key:', '');
var notificationsound = new Audio('https://' + window.location.hostname + ':' + location.port + '/sounds/notification.mp3');
notificationsound.volume = 0.1;

let code = (function () {
    return {
        encryptMessage: function (messageToencrypt = '', secretkey = '') {
            var encryptedMessage = CryptoJS.AES.encrypt(messageToencrypt, secretkey);
            return encryptedMessage.toString();
        },
        decryptMessage: function (encryptedMessage = '', secretkey = '') {
            var decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretkey);
            var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
            return decryptedMessage;
        }
    };
})();

var socket = io.connect('https://' + window.location.hostname + ':' + location.port);

socket.on('connect', function () {
    socket.emit('chat event', {
        data: 'User Connected'  
    });
});

document.getElementById('msg').focus();

document.getElementById('msg').addEventListener('keyup', function (event) {
    event.preventDefault();
    
    if (event.keyCode === 13) {
        checkCommands();
    }
});

document.getElementById('keyname').innerText = 'Key: ' + decryptPass;

socket.emit('chat event', {
    user_name : code.encryptMessage(user_name, decryptPass),
    message : code.encryptMessage('has joined the room.', decryptPass)
});

function form2 () {
    let user_input =  document.getElementById('msg').value;
    
    if (user_input == '') {
        return;
    }
    
    socket.emit('chat event', {
        user_name : code.encryptMessage(user_name, decryptPass),  
        message : code.encryptMessage(user_input, decryptPass)
    });
    
    $('input.message').val('').focus();
}

socket.on('my response', function (msg) {
    console.log(msg);
    
    if (typeof msg.user_name !== 'undefined') {
        $('h3').remove();
        messagebox = document.createElement('P');
        messagebox.className = 'messagetxt';
        
        if (code.decryptMessage(msg.user_name, decryptPass) == '' && code.decryptMessage(msg.message, decryptPass) == '') {
            return;
        }
        
        text = document.createTextNode(code.decryptMessage(msg.user_name, decryptPass) + ': ' + code.decryptMessage(msg.message, decryptPass));
        messagebox.appendChild(text);
        messages = document.getElementsByName('messageviewer')[0];
        messages.appendChild(messagebox);
        messages.scrollTop = messages.scrollHeight;
        
        if (document.hasFocus()) {
            return;
        }
        
        notificationsound.play();
    }
});

function switchTheme() {
    button = document.getElementById('toggler').innerText;
    console.log(button);
    
    if (button === 'DARK') {
        console.log('yes');
        document.documentElement.setAttribute('data-theme','light');
        document.getElementById('toggler').innerText = 'LIGHT';
        
    } else {
        document.documentElement.setAttribute('data-theme','dark');
        document.getElementById('toggler').innerText = 'DARK';
    }
}

function leaveRoom() {
    socket.emit('chat event', {
        user_name : code.encryptMessage(user_name, decryptPass),
        message : code.encryptMessage('has left the room.', decryptPass)
    });
}

window.addEventListener('beforeunload', function (evt) {
    // Cancel the event (if necessary)
    evt.preventDefault();
    // Google Chrome requires returnValue to be set
    leaveRoom();
    evt.returnValue = '';
});


document.getElementById("sendbutton").addEventListener("click", checkCommands);
document.getElementById("toggler").addEventListener("click", switchTheme);
