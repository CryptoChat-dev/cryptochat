import React, {useContext} from 'react';
import {Helmet} from 'react-helmet';
import {Context} from '../Components/Store';
import {useHistory} from 'react-router-dom';
import {eff} from '../assets/eff';
import {Dialog} from "@reach/dialog";
import "@reach/dialog/styles.css"

const Splash = () => { // State Variables
    const history = useHistory();

    const [state, dispatch] = useContext(Context);
    const [key, setKey] = React.useState('');
    const [username, setUsername] = React.useState('');

    const [showDialog, setShowDialog] = React.useState(false);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);

    const [showEVDialog, setShowEVDialog] = React.useState(false);
    const openEV = () => setShowEVDialog(true);
    const closeEV = () => setShowEVDialog(false);


    var themeSetting;

    function changeTheme() {
        if (state.theme === 'light') {
            themeSetting = 'dark';
            dispatch({type: 'SET_OTHEME', payload: 'light'})
            dispatch({type: 'SET_MODAL', payload: '#292929'})
        } else {
            themeSetting = 'light';
            dispatch({type: 'SET_OTHEME', payload: 'dark'})
            dispatch({type: 'SET_MODAL', payload: '#b3b3b3'})
        }
        dispatch({type: 'SET_THEME', payload: themeSetting})
        document.documentElement.setAttribute('data-theme', themeSetting);
    }

    function handleJoin() {
        if (username.length < 1 || key.length < 1) { // setIsOpen(true);
            return;
        }
        dispatch({type: 'SET_USERNAME', payload: username});
        dispatch({type: 'SET_KEY', payload: key});
        history.push('/chat');
    }

    function getWordNum() { // get the random words from the dice ware dict
        var wordslist = []
        for (var i = 0; i < 6; i += 1) {
            var newnum = []
            for (var j = 0; j < 5; j += 1) { // roll a 6 sided die
                newnum.push(secureRandom(6) + 1)
            }
            var theword = eff[newnum.join('')]
            wordslist.push(theword.charAt(0).toUpperCase() + theword.slice(1))
        }
        setKey(wordslist.join(''))
    }

    function scorePassword(pass) {
        var score = 0;
        if (! pass) 
            return score;
        


        // award every unique letter until 5 repetitions
        var letters = Object();
        for (var i = 0; i < pass.length; i++) {
            letters[pass[i]] = (letters[pass[i]] || 0) + 1;
            score += 5.0 / letters[pass[i]];
        }

        // bonus points for mixing it up
        var variations = {
            digits: /\d/.test(pass),
            lower: /[a-z]/.test(pass),
            upper: /[A-Z]/.test(pass),
            nonWords: /\W/.test(pass)
        }

        var variationCount = 0;
        for (var check in variations) {
            variationCount += (variations[check] === true) ? 1 : 0;
        }
        score += (variationCount - 1) * 10;

        return parseInt(score);
    }

    function secureRandom(count) { // generate a cryptographically secure integer
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

    function screening() {
        if (key.length < 1 || username.length < 1) {
            openEV();
            return;
        }
        var score = scorePassword(key);
        console.log(score);
        if (score < 80) {
            open();
            return;
        }
        handleJoin();
    }

    return (
        <React.Fragment>
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
                                <input id="key" type="username" class="message"
                                    value={key}
                                    placeholder="Room Key"
                                    onChange={
                                        (e) => setKey(e.target.value)
                                    }/>
                                <div class="randomize">
                                    <button class="button randomize" id="randomizer"
                                        onClick={getWordNum}>Random</button>
                                </div>
                            </div>
                            <div class="buttons">
                                <div class="buttons top">
                                    <button class="button theme" id="toggler"
                                        onClick={changeTheme}>
                                        {
                                        state.oppositeTheme
                                    }</button>
                                    <button class="button join" id="join"
                                        onClick={screening}>Join</button>
                                </div>
                                <div class="buttons bottom">
                                    <button class="button legal"
                                        onClick={
                                            () => {
                                                history.push('/legal')
                                            }
                                    }>Legal</button>
                                    <a href="https://github.com/httpjamesm/cryptochat/" rel="noreferrer" target="_blank">
                                        <button class="button github">Github</button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Dialog style={
                        {
                            backgroundColor: state.modalColor,
                            minWidth: "calc(min(350px,90%))",
                            width: "25%",
                            padding: "2%",
                            textAlign: "center",
                            borderRadius: "10px"
                        }
                    }
                    isOpen={showDialog}
                    onDismiss={close}>
                    <h1>Weak Key</h1>
                    <p>The key you entered is insecure. It is recommended to use the random button. Do you wish to override?</p>
                    <div class="modalButtons">
                        <button class="modalButton red"
                            onClick={handleJoin}>Yes</button>
                        <button class="button"
                            onClick={close}>No</button>
                    </div>
                </Dialog>
                <Dialog isOpen={showEVDialog}
                    onDismiss={closeEV}
                    style={
                        {
                            backgroundColor: state.modalColor,
                            minWidth: "calc(min(350px,90%))",
                            width: "25%",
                            padding: "2%",
                            textAlign: "center",
                            borderRadius: "10px"
                        }
                }>
                    <h1>Empty Values</h1>
                    <p>You can't have an empty username or key!</p>
                    <div class="modalButtons">
                        <button class="button"
                            onClick={closeEV}>Ok</button>
                    </div>
                </Dialog>

            </div>

        </React.Fragment>
    )
}

export default Splash;
