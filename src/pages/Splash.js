import React, {useContext, useEffect} from 'react';
import {Helmet} from 'react-helmet';
import {Context} from '../Components/Store';

const Splash = ({displayChat, setDisplayChat}) => {
    // State Variables

    const [state, dispatch] = useContext(Context);
    const [key, setKey] = React.useState();
    const [username, setUsername] = React.useState();

    var themeSetting;
    
    function changeTheme() {
        if (state.theme === 'light') {
            themeSetting = 'dark';
        } else {
            themeSetting = 'light';
        }
        dispatch({type: 'SET_THEME', payload: themeSetting})
        document.documentElement.setAttribute('data-theme', themeSetting);
    }

    function handleJoin() {
        dispatch({type: 'SET_USERNAME', payload: username});
        dispatch({type: 'SET_KEY', payload: key});
        setDisplayChat(true);
    }

    return (<React.Fragment>
        <Helmet>
            <link rel="stylesheet" href="/styles/Splash.css"></link>
        </Helmet>
        <div id="content">
            <div class="container">
                <div class="logo"></div>
                <h1>CryptoChat</h1>
            </div>
            <div class="messagebox-parent">
                <div class="messagebox">
                    <div class="username">
                        <input id="msg" type="username" class="message" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        <div class="roomkey">
                            <input id="key" type="username" class="message" placeholder="Room Key" onChange={(e) => setKey(e.target.value)}/>
                            <div class="randomize">
                                <button class="button randomize" id="randomizer">Random</button>
                            </div>
                        </div>
                        <div class="buttons">
                            <div class="buttons top">
                                <button class="button theme" id="toggler"
                                    onClick={changeTheme}>Light</button>
                                <button class="button join" id="join" onClick={handleJoin}>Join</button>
                            </div>
                            <div class="buttons bottom">
                                <a href="/legal">
                                    <button class="button legal">Legal</button>
                                </a>
                                <a href="https://github.com/httpjamesm/cryptochat/" rel="noreferrer" target="_blank">
                                    <button class="button github">Github</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </React.Fragment>)
}

export default Splash;
