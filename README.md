# GitServed

Git Served was created based off of one question: How can I run a persistent chat application without needing to worry about serving it somewhere?

This is a very early prototype of how such a chat client might work. It uses a chat log (right now the `README.md` file) in a specified repo to track all messages being sent. It uses the github developer API to push each message to the chat log and will eventually poll the file for new messages from other users and update when necessary (Temporarily, users can hit the send button with an empty message field to update the chat window). There are a few other ways that this could be implemented using the API but this was the most straight forward way to get something off the ground.

#### In its current state, GitServed runs as a Chrome extension so if you want to check it out, here are the steps:

0. Get Chrome
1. In Chrome, browse to `chrome://extensions/`
2. Check the Developer mode box
3. Download the source code
4. Click the "Load unpacked extension" button and select the GitServed folder. A small icon will pop up in the top right corner that says "Hello"
5. Click the icon and the UI for GitServed will pop up.
6. Sign in with your GitHub account information and click "Login." NOTE: This button doesn't actually login, it just saves off a cookie with your info so it doesn't have to sit on the screen. Fill in the owner and the name of the repo (Make sure it has a file named `README.md`) you want to chat in and have at it.

Disclaimer: As I stated before, this is just a prototype and so it's not very robust yet. Any use that doesn't align with the instructions is likely to make you and the browser sad. This code base will be changing pretty rapidly for a while as I add more features to make it more usable.

Disclaimer 2: I am the literal worst at Javascript and HTML, don't judge me.
