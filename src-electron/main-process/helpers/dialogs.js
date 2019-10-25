import { ipcMain } from 'electron';

export class DialogMessage {
  /**
   * The message to display.
   * @type {string}
   */
  message = '';

  /**
   * Title of the message.
   * @type {string}
   */
  title = 'Message';

  /**
   * Type of the message.
   * @type {'info' | 'warn' | 'error'}
   */
  type = 'info';
}

class Dialog {
  /**
   * A queue of messages;
   * @type {DialogMessage[]}
   * @private
   */
  _messagesQueue = [];

  constructor() {
    ipcMain.removeAllListeners('get-dialog');
    ipcMain.on('get-dialog', event => {
      const nextMessage = this._messagesQueue.shift();
      event.reply('dialog-show', nextMessage);
    });
  }

  /**
   * Adds a message to the queue.
   * @param {DialogMessage} message A message to show.
   */
  show(message) {
    this._messagesQueue.push(message);
  }

  /**
   * Adds message to the front of the queue.
   * @param {DialogMessage} message A message to show.
   */
  showNext(message) {
    this._messagesQueue = [message, ...this._messagesQueue];
  }
}

export const dialog = new Dialog();
