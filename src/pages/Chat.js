import React, {useContext} from 'react';
import {Helmet} from 'react-helmet';

const Chat = () => { // console.log('test')
    return (<React.Fragment>
        <Helmet>
            <link rel="stylesheet" href="/styles/Chat.css"/>
        </Helmet>
        <div class="chatbox-parent" id="chatbox-parent">
            <div class="chatbox-child">
                <div class="chatbox-header">
                    <p class="keyname" id="keyname"></p>
                    <h1 class="chatbox-title">CryptoChat</h1>
                    <h2 class="chatbox-subtitle">
                        A stunning encrypted chat webapp.
                    </h2>
                </div>
                <div class="chatbox-messages">
                    <div class="messageviewer-parent">
                        <div id="messageviewer" name="messageviewer" class="messageviewer">
                            <p class="messagetxt"></p>
                        </div>
                    </div>
                    <div class="messagebox">
                        <div class="fields">
                            <div class="username">
                                <input id="msg" type="text" class="message" placeholder="Hello!"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chatbox-buttons">
                    <button class="button theme" id="toggler">Light</button>
                    <button class="button send" id="sendbutton">Send</button>
                    <button class="button leave" id="leavebutton">Leave</button>
                </div>
            </div>
        </div>

    </React.Fragment>)
}

export default Chat;
