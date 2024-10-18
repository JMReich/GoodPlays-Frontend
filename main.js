// This file is the main entry point for the Electron application. 
// Electron is not currently installed and the focus is on the front-end development
// for a website. Desktop application development will be considered in the future.


const {app, BrowserWindow} = require('electron');

function createWindow () {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 1920,
        height: 1080,
        minHeight: 600,
        minWidth: 800,
        webPreferences: {
        nodeIntegration: true
        }
    })
    
    // and load the index.html of the app.
    win.loadFile('index.html')
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    } 
})


