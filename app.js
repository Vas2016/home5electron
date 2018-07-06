const electron = require("electron")
const url = require("url")
const path = require("path")

const { app, BrowserWindow, Notification, ipcMain } = electron

let mainWindow
app.on('ready', function () {
    mainWindow = new BrowserWindow({ frame: false, width: 180, height: 180, resizable: false, fullscreen: false, transparent: true })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/windows/start', 'html.html'),
        protocol: 'file',
        slashes: true
    }))
    mainWindow.show()


    mainWindow.on('closed', () => {
        // Разбирает объект окна, обычно вы можете хранить окна     
        // в массиве, если ваше приложение поддерживает несколько окон в это время,
        // тогда вы должны удалить соответствующий элемент.
        mainWindow = null
    })
    ipcMain.on('close', function () {

        app.quit();
    });
})

app.on('window-all-closed', () => {
    // На macOS это обычно для приложений и их строки меню   
    // оставаться активным до тех пор, пока пользователь не выйдет явно с помощью Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // На MacOS это общее для того чтобы создать окно в приложении, когда значок 
    // dock нажали и нет других открытых окон.
    if (win === null) {
        createWindow()
    }
})