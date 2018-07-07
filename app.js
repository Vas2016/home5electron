const electron = require("electron")
const url = require("url")
const path = require("path")

const { app, BrowserWindow, Notification, ipcMain, Tray, Menu } = electron

let startWindow
let mainWindow
var mainWinWidth = 120
var mainWinHeight = 250

// let tray
var ip = ""
app.on('ready', function () {
    startWindow = new BrowserWindow({ frame: false, width: 180, height: 180, resizable: false, fullscreen: false })
    startWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/windows/start', 'html.html'),
        protocol: 'file',
        slashes: true
    }))
    // tray = new Tray(path.join(__dirname, 'app/icons', 'round_home_green_48dp.png'))
    // const contextMenu = Menu.buildFromTemplate([
    //     { label: 'Item1', type: 'radio' },
    //     { label: 'Item2', type: 'radio' },
    //     { label: 'Item3', type: 'radio', checked: true },
    //     { label: 'Item4', type: 'radio' }
    // ])
    // tray.setToolTip('This is my application.')
    // tray.setContextMenu(contextMenu)
    const d_x = electron.screen.getPrimaryDisplay().bounds.width - mainWinWidth
    const d_y = electron.screen.getPrimaryDisplay().bounds.height - mainWinHeight
    mainWindow = new BrowserWindow({
        frame: false, x: d_x, y: d_y,
        width: mainWinWidth, height: mainWinHeight,
        resizable: false,
        fullscreen: false,
        show: false
        // ,type:'desktop'
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'app/windows/main', 'html.html'),
        protocol: 'file',
        slashes: true
    }))
    mainWindow.on('closed', () => {
        mainWindow = null
    })

    startWindow.show()


    startWindow.on('closed', () => {
        startWindow = null
    })

    ipcMain.on('btn_conn', function (_ip) {
        ip = _ip

        // tray.setToolTip('Home 5')
        // tray.on('click', () => {
        //     mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
        // })
        mainWindow.show()
        mainWindow.focus()
        startWindow.hide()
        startWindow = null
        console.log('btn')
    })
    ipcMain.on('close', function () {
        app.quit()
    })
    ipcMain.on('min_main', function () {
        mainWindow.minimize()
    })
    console.log('try');

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