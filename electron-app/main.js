const path = require('path');
const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const tar = require('tar');
const fs = require('fs');

const createWindow = () => {
  try {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
      },
    });

    win.loadURL('http://localhost:8000');
  } catch (error) {
    console.error('Failed to create Electron window:', error);
  }
};

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});


//conda package that needs to be unpacked is in electorn-app directory, under name newCondaPackedEnv.tar.gz
const condaEnvPath = path.join(__dirname, 'newCondaPackedEnv.tar.gz');
console.log('Conda environment path:', condaEnvPath);

const extractCondaEnvironment = async () => {
  const extractPath = path.join(__dirname, 'myCondaEnv');

  //check if conda env directory already exists, so we don't download it twice.
  if (!fs.existsSync(extractPath)) {
    fs.mkdirSync(extractPath);

    console.log('Conda environment directory created');
    console.log('Starting Conda environment extraction...');
  } else {
    console.log('Conda environment already exists');
    return;
  }

  try {
    await tar.extract({
      file: condaEnvPath,
      cwd: extractPath,
    });

    console.log('Conda environment extracted successfully');
  } catch (error) {
    console.error('Failed to extract Conda environment:', error);
  }
};

app.whenReady().then(() => {
  extractCondaEnvironment();

  // starting django is delayed 30 min so that conda env loads correctly
  setTimeout(() => {
    const pythonExecutable = path.join(__dirname, 'myCondaEnv', 'python.exe');
    const managePyPath = path.join(__dirname, '..', 'app', 'manage.py');
    const djangoServer = spawn(pythonExecutable, [managePyPath, 'runserver', '--noreload', '127.0.0.1:8000']);

    djangoServer.stdout.on('data', (data) => {
      console.log(`Django server: ${data}`);

      if (data.includes('Starting development server at')) {
        createWindow();
      }
    });

    djangoServer.stderr.on('data', (data) => {
      // Check if the data includes HTTP logs
      if (data.toString().match(/"\w+ \/\S* HTTP\/\d\.\d" \d+ \d+/)) {
        console.log(`Django server (HTTP log): ${data}`);
      } else {
        console.error(`Django server error: ${data}`);
      }
    });
  }, 1800000); // Delay in milliseconds (adjust as needed)

  app.on('activate', () => {
    // Create a new window if none are open when the app is activated
    if (BrowserWindow.getAllWindows().length === 0) {
      console.log("Activate event: Creating Electron window");
      createWindow();
    }
  });
});
