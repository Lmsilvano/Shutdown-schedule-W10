const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        }
    });

    win.loadFile('index.html');
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
let timerWindow = new BrowserWindow({
    width: 400,
    height: 200,
    frame: false,
    webPreferences: {
        nodeIntegration: true
    }
});

// Carregue a página do timer na janela
timerWindow.loadFile('timer.html');

// Defina o tempo restante para desligamento
timerWindow.webContents.on('did-finish-load', () => {
    timerWindow.webContents.send('set-shutdown-time', shutdownTime);
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