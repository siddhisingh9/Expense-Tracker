const path = require('path');
const { app, BrowserWindow , Menu } = require('electron');
const { subscribe } = require('diagnostics_channel');
const isMac = process.platform === 'darwin';

//Create the Window
function createWindow() {
    const window = new BrowserWindow({
        title: 'Expense Tracker',
        width: 640,
        height: 770,
        resizable: false,
        fullscreenable: false,
        maximizable: false,
    });

    window.loadFile(path.join(__dirname, './renderer/index.html'))
}

//App ready
app.whenReady().then(() => {
    createWindow();

    //Implement Menu
    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
          createWindow()
        }
    })
})

//Menu Template
const menu = [
    {
        role: 'fileMenu'
    }
];

app.on('window-all-closed', () => {
    if (!isMac) {
      app.quit()
    }
})