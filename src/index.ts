import { app, BrowserWindow, Menu, MenuItem, ipcMain } from 'electron';
declare const MAIN_WINDOW_WEBPACK_ENTRY: any;

import { windowMenu } from './windowMenu';


import { printBill }  from './print';


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}


const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,      
    }
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  
  
  //mainWindow.maximize()
  // Open the DevTools.
  mainWindow.webContents.openDevTools();  
  const menu = Menu.buildFromTemplate(windowMenu(mainWindow))
  
  
  Menu.setApplicationMenu(menu);
  mainWindow.setMenuBarVisibility(false)

};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.







app.on('ready', createWindow);



// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

printBill(); 
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
