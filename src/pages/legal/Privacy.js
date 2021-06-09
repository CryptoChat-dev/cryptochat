import React, {useContext} from 'react';
import {Helmet} from 'react-helmet';
import {useHistory} from 'react-router-dom';

const Privacy = () => {
    const history = useHistory();

    return (
        <React.Fragment>
            <Helmet>
                <title>CryptoChat - Privacy</title>
                <meta name="description" content="Find out what data is being collected and how it is being handled."></meta>
                <link rel="stylesheet" href="/styles/Privacy.css"></link>
            </Helmet>
            <div class="chatbox-parent">
                <div class="chatbox-child">
                    <div class="chatbox-header">
                        <h1 class="chatbox-title">CryptoChat - Privacy</h1>
                        <h2 class="chatbox-subtitle">
                            Find out what data's being collected and how it's being
                                                                                handled.
                        </h2>
                    </div>
                    <p class="textcontent">
                        cryptochat.dev respects and values user privacy, which is
                                                                    why we collect what is only strictly necessary for our
                                                                    services to function properly. The contents of this policy
                                                                    describe what data we collect, how we collect it and who we
                                                                    may share it with. The pronouns "we" and "us" represent
                                                                    cryptochat.dev's websites and services and its affiliates.
                    </p>
                    <h3 class="header">Scope</h3>
                    <p class="textcontent">
                        This privacy policy only applies to the cryptochat.dev
                                                                    websites and services. Other services possess their own
                                                                    privacy policies which define how they use data.
                    </p>
                    <h3 class="header">Data Collected</h3>
                    <p class="textcontent">
                        CryptoChat collects the absolute minimum. We only collect
                                                                    what is necessary to provide CryptoChat services to the
                                                                    end-user--nothing else.
                    </p>
                    <ul class="bullet">
                        <li>
                            When visiting the CryptoChat website, the user's IP
                                                                                address is stored in memory in order to enforce IP-based
                                                                                ratelimits. This prevents API abusers and spam bots from
                                                                                flooding the website. This data is then wiped from
                                                                                memory within 60 seconds of the user's website
                                                                                departure. IP addresses are never stored permanently,
                                                                                nor to disk.
                        </li>
                        <li>
                            Encrypted versions of users' usernames and messages may
                                                                                be stored temporarily in memory in order to debug issues
                                                                                with the platform. This data is never saved to disk, and
                                                                                will almost always be toggled off. In any event, no CryptoChat
                                                                                user, including its developers, can see user content
                                                                                submitted on the platform due to end-to-end encryption.
                        </li>
                    </ul>
                    <p class="textcontent">
                        CryptoChat does not sell, rent or sublease user information.
                                                                    While CryptoChat does not log user information, the services
                                                                    it uses to deliver content to the end-user may. The
                                                                    following services may collect user information when in use:
                    </p>
                    <ul class="bullet">
                        <li>Cloudflare (cloudflare.com)</li>
                    </ul>
                    <p class="textcontent">
                        These services have their own privacy policies. We encourage
                                                                    users to read the individual documents.
                    </p>
                    <h3 class="header">Data Handling</h3>
                    <p class="textcontent">
                        CryptoChat does not save user information, including IP
                                                                    address and user submitted content. User submitted content
                                                                    cannot be read by anybody, including CryptoChat developers,
                                                                    due to client-side encryption. In the event of a legal
                                                                    notice pertaining to user data, we will not be able to
                                                                    comply because of the lack of logged data.
                    </p>
                    <h3 class="header">Cookies</h3>
                    <p class="textcontent">
                        CryptoChat may place cookies in user browsers in order to
                                                                    improve user experience on our website. These cookies are
                                                                    never used to cross-track or identify users.
                    </p>
                    <h3 class="header">Inquiries</h3>
                    <p class="textcontent">
                        All inquiries regarding privacy, including legal requests,
                                                                    should go to<br></br>
                        <u>
                            <a href="mailto:privacy@cryptochat.dev">privacy@cryptochat.dev</a>
                        </u>.
                    </p>
                    <div class="chatbox-buttons">
                        <button class="button home"
                            onClick={
                                () => history.push('/legal')
                        }>Back</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Privacy;
