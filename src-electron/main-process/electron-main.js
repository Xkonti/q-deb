import { app, BrowserWindow, ipcMain, dialog, clipboard } from 'electron';
import LogListener from './log-listener';
import { nextNumber } from '../helpers/unique-ids';

/**
 * Set `__statics` path to static files in production;
 * The reason we are setting it here is that the path needs to be evaluated at runtime
 */
if (process.env.PROD) {
  global.__statics = require('path')
    .join(__dirname, 'statics')
    .replace(/\\/g, '\\\\');
}

let mainWindow;

/**
 * @type {LogListener}
 */
let logListener;

let newMessages = [];

function createWindow() {
  /**
   * Initial window options
   */

  mainWindow = new BrowserWindow({
    width: 1100,
    height: 700,
    useContentSize: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(process.env.APP_URL);
  mainWindow.on('closed', () => {
    if (logListener != null) {
      logListener.stop();
      logListener = null;
    }
    mainWindow = null;
  });
}

function addMessage(request) {
  try {
    newMessages.push({
      id: nextNumber(),
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

function showDialog(message) {
  dialog.showMessageBox({
    title: 'Got new message',
    message: message
  });
}

function getServerStatus() {
  if (logListener == null) return 'not existing';
  return logListener.status;
}

ipcMain.on('start-server', async (event, settings) => {
  if (logListener != null && logListener.isOff)
    event.reply('start-server-status', false);
  logListener = new LogListener(settings, addMessage);
  let result = await logListener.start();
  event.reply('start-server-status', result);
});

ipcMain.on('stop-server', async (event) => {
  if (logListener == null || !logListener.isOn)
    event.reply('stop-server-status', false);
  let result = await logListener.stop();
  event.reply('stop-server-status', result);
});

ipcMain.on('add-new-message', (event, arg) => {
  newMessages.push(arg);
});

ipcMain.on('get-new-messages', (event) => {
  event.reply('new-messages', newMessages);
  newMessages = [];
});

ipcMain.on('copyToClipboard', (event, arg) => {
  clipboard.writeText(JSON.stringify(arg));
});
