# cryptochat 2.0 [![DeepSource](https://deepsource.io/gh/CryptoChat-dev/cryptochat.svg/?label=active+issues)](https://deepsource.io/gh/CryptoChat-dev/cryptochat/?ref=repository-badge) [![CodeFactor](https://www.codefactor.io/repository/github/cryptochat-dev/cryptochat/badge)](https://www.codefactor.io/repository/github/cryptochat-dev/cryptochat) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/f9b9b91bc9e14829809e7547184e5087)](https://www.codacy.com/gh/CryptoChat-dev/cryptochat/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=CryptoChat-dev/cryptochat&amp;utm_campaign=Badge_Grade) [![Memes](https://img.shields.io/badge/need-memes-red)](https://img.shields.io/badge/need-memes-red)

[Official Instance](https://cryptochat.dev), [Roadmap](https://github.com/CryptoChat-dev/cryptochat/projects/1), [Legal](https://cryptochat.dev/legal), [Email](mailto:contact@cryptochat.dev)

CryptoChat is a simple, secure and beautiful chat webapp. Chatting has never been so satisfying.

## Features

Here's an overview of the features CryptoChat has to offer.

### Simple UI

CryptoChat has barely any clutter on its user interface. It's a simple, yet featured, interface that anybody could use--even your grandma!

![Dark Mode Desktop](https://james-has.among-drip.cool/6lvkfaackmvhcn7ki3.png?raw=true)

![Light Mode Desktop](https://i.should-not-be-a.live/jtju0jumo6cg49mzk5.png?raw=true)

![Dark Mode Mobile](https://what-the-fu.cc/a72fkb44q8piej26yb.jpeg?raw=true)

![Light Mode Mobile](https://windscribe.is-a-cu.lt/hx9qfnz22w1the7fny.jpeg?raw=true)

### Encryption

All messages sent through the official CryptoChat clients are end-to-end encrypted locally, meaning nobody except for the message recipients can read their contents. If you need more piece of mind during your chats, use the random key generator for an extra-secure key (it would take 3,505 years to crack!).

### Ephemeral

Message history is *never* stored when using CryptoChat clients. Not on the server, not on the client, not anywhere. When the browser tab goes, so does the chat history.

### Cross-Compatible

Since CryptoChat uses web frameworks, all you need is an electronic device with a web browser. Whether the device is a smartphone, tablet, game console or desktop computer, you can take CryptoChat with you everywhere.

### Open-Source

CryptoChat is open-source meaning that anybody can see its interworkings. This allows the community to improve on its codebase and spot potential security vulnerabilities, leading to an awesome product.

## Encryption Specifics

CryptoChat relies on the crypto-js AES encryption framework to encrypt all usernames and messages with the specified encryption/room key.

Here's how CryptoChat's encryption works:

1. The user enters their username and room key (which is used for the encryption key).

The client sends a SHA-512 hash of the encryption key to the backend webserver using Socket.IO. This hashed encryption key is used to create a socket room. The plaintext encryption key never leaves the client--ever.

2. The user sends a message.

Let's say Bob and Alice want to communicate to each other on CryptoChat. They both visit the website and enter the details. Bob says, "Hello Alice!".

Bob's client uses the plaintext encryption key to locally encrypt his username (Bob) and message (Hello Alice!). Alice's client receives the end-to-end message from the backend's using Socket.IO and decrypts the encrypted username and message using her local encryption key that she entered on the splash screen.

3. The user leaves the room.

Bob says goodbye to Alice and he closes his CryptoChat tab. His username, encryption key and messages are now discarded from his end. When Alice leaves CryptoChat, the same happens with her client.