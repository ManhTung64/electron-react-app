import { app, shell, BrowserWindow, screen, Tray } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import DataSource from '../../data-source'
import { ControllerSingleton } from './common/instance/controller.instance'
import { Notification } from 'electron'
// import { FbThread } from './threads/fb.thread'


let mainWindow: BrowserWindow;

async function createWindow() {
  // Create the browser window.
  const scree: Electron.Rectangle = screen.getPrimaryDisplay().workArea;
  mainWindow = new BrowserWindow({
    width: scree.width / 2,
    height: scree.height / 2,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {

      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(async () => {

  electronApp.setAppUserModelId('com.electron')

  new Notification({
    title: 'Test notifiction',
    subtitle: 'Subtitle',
    body: 'Go Go GO'
  }).show()
  const tray = new Tray('10838352.png')
  tray.setToolTip('Electron app')
  tray.on('click', () => {
    mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show()
  })

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // connect db
  try {
    const dataSource = DataSource.getInstance();
    const db = dataSource.getDatabase();
    ControllerSingleton.getProductInstance(db)
  } catch (error) {
    console.log(error)
  }

  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

