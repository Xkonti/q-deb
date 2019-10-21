import { app, BrowserWindow, ipcMain, dialog, clipboard } from 'electron';
import { start } from './server';

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path')
    .join(__dirname, 'statics')
    .replace(/\\/g, '\\\\');
}

let nextId = 0;
function getNextId() {
  const id = nextId;
  nextId++;
  return id;
}

let mainWindow;

function createWindow() {
  /**
   * Initial window options
   */
  let e = 'Creating server';

  start(addMessage).then(() => {
    mainWindow = new BrowserWindow({
      width: 1000,
      height: 600,
      useContentSize: true,
      webPreferences: {
        nodeIntegration: true
      }
    });

    mainWindow.loadURL(process.env.APP_URL);
    mainWindow.on('closed', () => {
      mainWindow = null;
    });
  }).catch(reason => {
    dialog.showMessageBox({
      title: 'Electron error',
      message: reason
    });
  });

}

function addMessage(request) {
  try {
    newMessages.push({
      id: getNextId(),
      exception: request.body.exception,
      level: request.body.level,
      message: request.body.message,
      source: request.body.source,
      tags: request.body.tags,
      timestamp: Date.parse(request.body.timestamp) || new Date()
    });
    return true;
  } catch (e) {
    newMessages.push({
      message: 'Can not create response message: ' + e,
      severity: 'error',
      timestamp: new Date()
    });
    return false;
  }
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

let newMessages = [];

function showDialog(message) {
  dialog.showMessageBox({
    title: 'Got new message',
    message: message
  });
}

ipcMain.on('add-new-message', (event, arg) => {
  //showDialog(`Received new message: ${JSON.stringify(arg)}`);
  newMessages.push(arg);
});

ipcMain.on('get-new-messages', (event, arg) => {
  //showDialog(`Sending all messages: ${JSON.stringify(newMessages)}`);
  event.reply('new-messages', newMessages);
  newMessages = [];
});

ipcMain.on('copyToClipboard', (event, arg) => {
  clipboard.writeText(JSON.stringify(arg));
});
