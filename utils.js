const { BrowserWindow } = require('electron');
module.exports = {


    isWindowOpen() {
        const windows = BrowserWindow.getAllWindows()
        console.info('Tamanho do windows:' + windows.length)
        if (windows.length >= 2) {
            return false
        }
        else return true
    }

}

