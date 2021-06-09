import React, {useContext} from 'react';
import {Helmet} from 'react-helmet';
import {Context} from '../Components/Store';
import { useHistory } from 'react-router-dom';
import {eff} from '../assets/eff';

const Splash = () => { // State Variables
    const history = useHistory();

    const [state, dispatch] = useContext(Context);
    const [key, setKey] = React.useState('');
    const [username, setUsername] = React.useState('');  

    var themeSetting;

    function changeTheme() {
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

    function handleJoin() {
        if (username.length < 1 || key.length < 1) {
            // setIsOpen(true);
            return;
        }
        dispatch({type: 'SET_USERNAME', payload: username});
        dispatch({type: 'SET_KEY', payload: key});
        // setDisplayChat(true);
        history.push('/chat');
    }

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
        }
        setKey(wordslist.join(''))
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
                        <input id="msg" type="username" class="message" placeholder="Username"
                            onChange={
                                (e) => setUsername(e.target.value)
                            }/>
                        <div class="roomkey">
                            <input id="key" type="username" class="message" value={key} placeholder="Room Key"
                                onChange={
                                    (e) => setKey(e.target.value)
                                }/>
                            <div class="randomize">
                                <button class="button randomize" id="randomizer" onClick={getWordNum}>Random</button>
                            </div>
                        </div>
                        <div class="buttons">
                            <div class="buttons top">
                                <button class="button theme" id="toggler"
                                    onClick={changeTheme}>{state.oppositeTheme}</button>
                                <button class="button join" id="join"
                                    onClick={handleJoin}>Join</button>
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
