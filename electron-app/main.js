const path = require('path')

const { app, BrowserWindow } = require('electron')

const { PythonShell } = require('python-shell')

const djangoServer = new PythonShell('../app/manage.py', {
    args: ['runserver', '127.0.0.1:8000']
})

djangoServer.on('message', (message) => {
    console.log('Django server:', message);
});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    })

    win.loadURL(
        `file://${__dirname}/../app/dummyapp/dummyapp/build/index.html`
    );
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})