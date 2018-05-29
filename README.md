# Memory Card Game
Udacity Frontend Nanodegree Project #2

Classic memory card game. Players choose a card theme and try to match all pairs of cards on the gameboard. Each move, a player flip over a pair of cards and each move is tracked. Once all pairs are matched, the player wins. A player is rated 1-3 stars depending on how long it takes for to match all cards.

## Build
These steps outline how to get the project setup in development using visual studio code.

### Prerequisites
* Node v10.1.0

### Installing
1. View instructions on installing version of node compatible with your system here https://nodejs.org/en/
2. Clone the repository and change into the directory
3. Install the application dependencies by running the following

`npm install`

4. The application is written in TypeScript. It must be compiled to JS. The remaining steps shows how to build the application within Visual Studio Code. If you are using a different editor, you must look up the steps for that particular editor.

#### Steps to build application in Visual Studio Code
1. With the project opened in vs code, run the build task by holding

`Command + Shift + b` for Mac or
`Ctrl + Shift + b` for Windows



2. You are presented with a drop down list of build tasks. Choose the *tsc: build - tsconfig.json* task
3. This will create the js files and store them in src/js directory
4. The app is launch in the web using Live Server extension in from visual studio code. If you are not using visual studio code, you can set up live server here https://www.npmjs.com/package/live-server. To start the server,

* Click on the *Go Live* quick launch button on vs code toolbar on the bottom of vs code window or
* Open the index.html file in live server by locating the file src/index.html, right click on the file, and choose *Open With Live Server*

5. Head over to url http://127.0.0.1:5500/src/index.html to view the app.

## Technologies
* Bootstrap
* Flexbox
* JQuery
* JavaScript
* TypeScript
* Webpack
* Node

# Acknowledgements
The current user interface is based on the design here [find link]
