const { BrowserWindow } = require('electron');
module.exports = {


    isWindowOpen(windowName) {
        const windows = BrowserWindow.getAllWindows()
        console.log(windows, 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        for (let i = 0; i < windows.length; i++) {
            console.log(windows[i].name, 'laçoooooooo de repetição')
            if (windows[i].name === windowName) {
                return true
            }
        }
        return false
    }

}