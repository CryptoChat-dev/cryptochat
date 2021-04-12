var matches = window.location.href.match(/\?key=(?<key>.*)&username=(?<username>.*)/);
var user_name;
var decryptPass;

if (matches != null) {
    decryptPass = matches.groups.key;
    user_name = matches.groups.username;
} else {
    window.open(window.location.hostname,"_self")
}

function checkCommands() {
    // get message and split the individual words into an array
    var message = document.getElementById('msg').value;
    var args = message.split(' ');

    // switch for command
    switch (args[0]) {
        case '/nick':
            // change username
            if (args.length == 1) {
                // if no username arguments were provided then alert the user
                window.alert(
                    'Invalid nickname. Correct usage: /nick <username>'
                );
            } else {
                var user_name = args[1];
                socket.emit('chat event', {
                    // broadcast the username change to the whole room
                    user_name: code.encryptMessage(user_name, decryptPass),
                    message: code.encryptMessage(
                        'changed their username to ' + args[1],
                        decryptPass
                    )
                });

                $('input.message').val('').focus();
                window.alert('Nickname changed to ' + args[1]);
            }
            break;

        case '/leave':
            // leave the room
            location.reload();
            break;

        default:
            // if no slash command, just send the message normally
            form2();
    }
}

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

// load notification sound
var notificationsound = new Audio(
    'https://' +
        window.location.hostname +
        ':' +
        location.port +
        '/sounds/notification.mp3'
);

notificationsound.volume = 0.1; //lower notification volume

let code = (function () {
    // encryption function
    return {
        encryptMessage: function (messageToencrypt = '', secretkey = '') {
            var encryptedMessage = CryptoJS.AES.encrypt(
                messageToencrypt,
                secretkey
            );
            return encryptedMessage.toString();
        },
        decryptMessage: function (encryptedMessage = '', secretkey = '') {
            var decryptedBytes = CryptoJS.AES.decrypt(
                encryptedMessage,
                secretkey
            );
            var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
            return decryptedMessage;
        }
    };
})();

// connect to socketio endpoint
var socket = io.connect(
    'https://' + window.location.hostname + ':' + location.port
);

socket.on('connect', function () {
    // on connect
    socket.emit('chat event', {
        data: 'User Connected'
    });
});

// focus the message input box
document.getElementById('msg').focus();
// bind the enter key to checkCommands for the message input box
document.getElementById('msg').addEventListener('keyup', function (event) {
    event.preventDefault();

    if (event.keyCode === 13) {
        checkCommands();
    }
});

// change to the key name
document.getElementById('keyname').innerText = 'Key: ' + decryptPass;

socket.emit('chat event', {
    // on join, broadcast to room
    user_name: code.encryptMessage(user_name, decryptPass),
    message: code.encryptMessage('has joined the room.', decryptPass)
});

function form2() {
    // send message from message box

    let user_input = document.getElementById('msg').value; // get the text from the message input box

    if (user_input == '') {
        // if there's nothing in the box, don't send anything to the server
        return;
    }

    socket.emit('chat event', {
        // encrypt and send the user's name and message
        user_name: code.encryptMessage(user_name, decryptPass),
        message: code.encryptMessage(user_input, decryptPass)
    });

    $('input.message').val('').focus(); // clear the message input box after send
}

socket.on('my response', function (msg) {
    console.log(msg); // for debugging: print the encrypted contents of the response

    if (typeof msg.user_name !== 'undefined') {
        // create a paragraph element and name it 'messagetxt'
        messagebox = document.createElement('P');
        messagebox.className = 'messagetxt';

        if (
            code.decryptMessage(msg.user_name, decryptPass) == '' &&
            code.decryptMessage(msg.message, decryptPass) == ''
        ) {
            // if the username and key are empty values, stop
            return;
        }

        // create a text node with the decrypted username and message
        text = document.createTextNode(
            code.decryptMessage(msg.user_name, decryptPass).toString() +
                ': ' +
                code.decryptMessage(msg.message, decryptPass).toString()
        );

        messagebox.appendChild(text); // append the node to the p element
        messages = document.getElementsByName('messageviewer')[0]; // get the messageviewer object
        messages.appendChild(messagebox); // append the p element to the messageviewer object

        if (
            messages.scrollHeight - messages.scrollTop <
            messages.clientHeight + 20
        ) {
            messages.scrollTop = messages.scrollHeight; // auto-scroll the message viewer for convenience
        }

        if (document.hasFocus()) {
            // if the tab is in focus, don't play any notification sound
            return;
        }

        notificationsound.play(); // play a notification sound
    }
});

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

function leaveRoom() {
    // on tab close, broadcast to the room

    socket.emit('chat event', {
        user_name: code.encryptMessage(user_name, decryptPass),
        message: code.encryptMessage('has left the room.', decryptPass)
    });
}

function leaveAndReload() {
    leaveRoom()
    window.open(window.location.hostname, "_self")
}

window.addEventListener('beforeunload', function (evt) {
    // execute code before the tab closes

    // Cancel the event (if necessary)
    evt.preventDefault();
    // Google Chrome requires returnValue to be set
    evt.returnValue = '';
    leaveRoom();
});

// bind the send button to checkCommands()
document.getElementById('sendbutton').addEventListener('click', checkCommands);
// bind the theme toggle button to switchTheme()
document.getElementById('toggler').addEventListener('click', switchTheme);
// bind the leave    button to leaveRoom()
var Alert = new CustomAlert();
document.getElementById('leavebutton').onclick = renderAlert; // Alert.render('You look very pretty today.')

function CustomAlert(){
    this.render = function(){
        //Show Modal
        let popUpBox = document.getElementById('popUpBox');
        popUpBox.style.display = "block";
        document.getElementById('chatbox-parent').style.filter = 'blur(10px)';

        //Close Modal
        if (document.getElementById('proceedLeave').children.length === 0) {
            confirmbutton = document.createElement('button');
            confirmbutton.className = 'modalButton-red';
            confirmbutton.appendChild(document.createTextNode('Yes'));
            confirmbutton.onclick = leaveAndReload;
            cancelbutton = document.createElement('button');
            cancelbutton.className = 'modalButton';
            cancelbutton.appendChild(document.createTextNode('No'));
            cancelbutton.onclick = Alert.ok;
            document.getElementById('proceedLeave').appendChild(confirmbutton);
            document.getElementById('cancelLeave').appendChild(cancelbutton);
        }

//         document.getElementById('proceedLeave').innerHTML = '<button onclick="leaveAndReload()" class="modalButton-red">Yes</button>';
//         document.getElementById('cancelLeave').innerHTML = '<button onclick="Alert.ok()" class="modalButton">No</button>';
    }
    
    this.ok = function(){
        document.getElementById('popUpBox').style.display = "none";
        document.getElementById('popUpOverlay').style.display = "none";
        document.getElementById('chatbox-parent').style.filter = 'none'
        
    }
}

function renderAlert(){
    Alert.render('You look very pretty today.')
}
