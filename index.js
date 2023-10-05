const { app, BrowserWindow, Menu } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
        width: 1400,
        height: 800,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    })

    Menu.setApplicationMenu(null);
    win.loadFile('./index.html')

    // win.on('closed', () => {
    //     win = null;
    // })
}

app.on('ready',createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
})