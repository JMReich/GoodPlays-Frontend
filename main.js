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


