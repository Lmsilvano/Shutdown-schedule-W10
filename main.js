const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const utils = require('./utils')

let timerWindow;

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    mainWindow.loadFile('index.html');
    return mainWindow
}

function createTimerWindow(tempo) {

    const timerWindow = new BrowserWindow({
        width: 400,
        height: 200,
        name: 'timer',
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });

    if (utils.isWindowOpen('timer')) {
        console.info('foii if')
        timerWindow.webContents.send('atualizar-temporizador', tempo)
        return
    } else {
        console.info('foii else')
        timerWindow.loadFile('timer.html')
        timerWindow.webContents.send('atualizar-temporizador', tempo)
        return timerWindow
    }
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});




// Agendar desligamento
function agendarDesligamento(tempo) {
    const comando = `shutdown /s /t ${tempo * 60}`;

    exec(comando, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(stdout);
    });
}

// Lidar com o envio do formulário
ipcMain.on('agendar-desligamento', (evento, tempo) => {
    agendarDesligamento(tempo);
    createTimerWindow(tempo);
});
ipcMain.on('cancelar-desligamento', (evento) => {
    exec('shutdown /a', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
        }

        console.log(stdout);
    });
});