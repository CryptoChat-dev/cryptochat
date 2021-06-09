import React, {useContext} from 'react';
import {Helmet} from 'react-helmet';
import {Context} from '../Components/Store';
import {useHistory} from 'react-router-dom';

const Legal = () => { // State Variables
    const history = useHistory();
    const [state, dispatch] = useContext(Context);

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

    return (
        <React.Fragment>
            <Helmet>
                <link rel="stylesheet" href="/styles/Legal.css"></link>
                <title>CryptoChat - Legal</title>
                <meta name="description" content="Read CryptoChat's legal policies regarding acceptable
                                                                                                                                            use, data handling, and more."></meta>
            </Helmet>
            <div class="chatbox-parent">
                <div class="chatbox-child">
                    <div class="chatbox-header">
                        <h1 class="chatbox-title">CryptoChat - Legal</h1>
                        <h2 class="chatbox-subtitle">
                            Read CryptoChat's legal policies regarding acceptable
                                                                                                                                                                    use, data handling, and more.
                        </h2>
                    </div>
                    <div class="chatbox-buttons">
                        <div class="legal">
                            <button class="button terms"
                                onClick={
                                    () => {
                                        history.push('/terms')
                                    }
                            }>Terms</button>
                            <button class="button privacy"
                                onClick={
                                    () => {
                                        history.push('/privacy')
                                    }
                            }>Privacy</button>
                        </div>
                    </div>
                    <div class="extras">
                        <button class="button theme" id="toggler"
                            onClick={changeTheme}>
                            {
                            state.oppositeTheme
                        }</button>
                        <button class="button home"
                            onClick={
                                () => {
                                    history.push('/')
                                }
                        }>Home</button>
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default Legal;
