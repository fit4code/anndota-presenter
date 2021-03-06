
const electron = require('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow, Menu } = electron

let mainWindow

app.on('ready', ( ) => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 640,
        minWidth: 745,
        minHeight: 250
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }))
    mainWindow.on('closed', ( ) => {
        app.quit( )
    })
    mainWindow.on('resize', ( ) => {
        mainWindow.webContents.send('onResize')
    })

    if (process.env.NODE_ENV !== 'production') {
        const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
        Menu.setApplicationMenu(mainMenu)
    }
})

const mainMenuTemplate = [ { } ]

if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({ })
}

if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools( )
                }
            },
            {
                label: 'Reload',
                role: 'reload'
            }
        ]
    })
}
