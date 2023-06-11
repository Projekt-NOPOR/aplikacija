const path = require('path');
const { app, BrowserWindow, protocol } = require('electron');
const { spawn } = require('child_process');

const myappExePath = 'C:\\Users\\Andjela\\Desktop\\FRI\\FUN STUFF\\NOPOR\\aplikacija\\app\\dist\\myapp\\myapp.exe';

const djangoServer = spawn(myappExePath, ['runserver', '--noreload', '127.0.0.1:8000']);

djangoServer.stdout.on('data', (data) => {
    console.log(`Django server: ${data}`);
});

djangoServer.stderr.on('data', (data) => {
    console.error(`Django server error: ${data}`);
});

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: true,
        },
    });

    win.loadURL('http://localhost:8000');
};

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});
