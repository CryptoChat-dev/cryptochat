import React, {useContext, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Context} from '../Components/Store';
import {useHistory} from 'react-router-dom';

// Crypto JS
import CryptoJS from 'crypto-js';

// Socket.IO
import {socket} from "../service/socket";

const Chat = () => {
    const history = useHistory();
    const [state, dispatch] = useContext(Context);
    const [message, setMessage] = React.useState();
    const [received, setReceived] = React.useState([]);
    const [joinedSent, setJoinedSent] = React.useState(false);

    var themeSetting;


    // Helper Functions

    const crypt = (function () { // encryption function
        return {
            encryptMessage: function (messageToencrypt = '', secretkey = '') {
                var encryptedMessage = CryptoJS.AES.encrypt(messageToencrypt, secretkey);
                return encryptedMessage.toString();
            },
            decryptMessage: function (encryptedMessage = '', secretkey = '') {
                try {
                    var decryptedBytes = CryptoJS.AES.decrypt(encryptedMessage, secretkey);
                    var decryptedMessage = decryptedBytes.toString(CryptoJS.enc.Utf8);
                    return decryptedMessage;
                } catch (err) {
                    console.log("Malformed UTF-8 Data.")
                }
            }
        };
    })();

    useEffect(() => {
        if (joinedSent === false) {
            socket.emit('chat event', JSON.parse(JSON.stringify({ // on join, broadcast to room
                "user_name": crypt.encryptMessage(state.username, state.key),
                "message": crypt.encryptMessage('has joined the room.', state.key)
            })));
            setJoinedSent(true);
        }
    })

    useEffect(() => {
        socket.on('my response', messageHandler);
        return() => {
            socket.off('my response')
        }
    }, []);

    function messageHandler(msg) {
        console.log(msg); // for debugging: print the encrypted contents of the response
        var decryptedUsername;
        var decryptedMessage;
        decryptedUsername = crypt.decryptMessage(msg.user_name, state.key);
        decryptedMessage = crypt.decryptMessage(msg.message, state.key);
        if (decryptedUsername === '' || decryptedMessage === '') { // if the username and message are empty values, stop
            return;
        }
        setReceived((messages) => [
            ...messages,
            <div>
                <p> {decryptedUsername}: {decryptedMessage}</p>
            </div>
        ]);

    }
    function changeTheme() { // Change app-wide theme
        if (state.theme === 'light') {
            themeSetting = 'dark';
            dispatch({type: 'SET_OTHEME', payload: 'light'})
        } else {
            themeSetting = 'light';
            dispatch({type: 'SET_OTHEME', payload: 'dark'})
        }
        dispatch({type: 'SET_THEME', payload: themeSetting})
        document.documentElement.setAttribute('data-theme', themeSetting);
    }

    // Handlers

    function handleMessageChange(e) {
        setMessage(e.target.value);
    }

    function handleLeave() {
        history.push('/');
    }

    function handleSend() {
        socket.emit('chat event', JSON.parse(JSON.stringify({
            "user_name": crypt.encryptMessage(state.username, state.key),
            "message": crypt.encryptMessage(message, state.key)
        })));
        setMessage('')
    }

    function handleMessageKeyDown(e) {
        if (e.keyCode === 13) {
            handleSend();
        }
    }

    // Return

    return (
        <React.Fragment>
            <Helmet>
                <link rel="stylesheet" href="/styles/Chat.css"/> {/* <script src="/crypto-js/aes.js"></script> */} </Helmet>
            <div class="chatbox-parent" id="chatbox-parent">
                <div class="chatbox-child">
                    <div class="chatbox-header">
                        <p class="keyname" id="keyname">Room Key: {
                            state.key
                        }</p>
                        <h1 class="chatbox-title">CryptoChat</h1>
                        <h2 class="chatbox-subtitle">
                            A stunning encrypted chat webapp.
                        </h2>
                    </div>
                    <div class="chatbox-messages">
                        <div class="messageviewer-parent">
                            <div id="messageviewer" name="messageviewer" class="messageviewer">
                                <div class="messagetxt">
                                    {received}</div>
                            </div>
                        </div>
                        <div class="messagebox">
                            <div class="fields">
                                <div class="username">
                                    <input id="msg" type="text" class="message" placeholder="What's up?"
                                        value={message}
                                        onChange={handleMessageChange}
                                        onKeyDown={handleMessageKeyDown}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="chatbox-buttons">
                        <button class="button theme" id="toggler"
                            onClick={changeTheme}>
                            {
                            state.oppositeTheme
                        }</button>
                        <button class="button send" id="sendbutton"
                            onClick={handleSend}>Send</button>
                        <button class="button leave" id="leavebutton"
                            onClick={handleLeave}>Leave</button>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}
export default Chat;
