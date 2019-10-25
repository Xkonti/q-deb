import { ipcMain } from 'electron';

/**
 * A class handling the process of showing dialogs on the render process
 * and reacting to the user input within those dialogs.
 */
class Dialog {
  /**
   * A queue of dialogs' data.
   * @type {DialogMessage[]}
   * @private
   */
  _messagesQueue = [];

  /**
   * A map of dialogs' actions awaiting user input.
   * @type {Map<number, {onOk: function(number), onCancel: function(number)}>}
   * @private
   */
  _awaitingActions = new Map();

  constructor() {
    ipcMain.removeAllListeners('get-dialog');
    ipcMain.removeAllListeners('dialog-confirm-response');

    ipcMain.on('get-dialog', event => {
      const nextMessage = this._messagesQueue.shift();
      event.reply('dialog-show', nextMessage);
    });

    ipcMain.on('dialog-confirm-response', (event, arg) => {
      const id = arg.id;
      const actions = this._awaitingActions.get(id);
      if (actions == null) return;
      this._awaitingActions.delete(id);
      if (arg.result) actions.onOk(id);
      else actions.onCancel(id);
    });
  }

  /**
   * Shows an alert dialog on the renderer thread.
   * @param {DialogMessage} message Data to show in the dialog.
   * @param {boolean} asNext A value indicating whether this dialog should be
   * the next one to be displayed (insert at the beginning of the queue).
   */
  showAlert(message, asNext = false) {
    message.type = 'alert';
    if (asNext) this._messagesQueue = [message, ...this._messagesQueue];
    else this._messagesQueue.push(message);
  }

  /**
   * Shows an confirm dialog on the renderer thread. You can perform actions
   * on the main thread in response to the user's input.
   * @param {DialogMessage} message Data to show in the dialog.
   * @param {function(number)} onOk An action performed when user chooses `OK`.
   * @param {function(number)} onCancel An action performed when user
   * chooses `CANCEL`.
   * @param {boolean} asNext A value indicating whether this dialog should be
   * the next one to be displayed (insert at the beginning of the queue).
   */
  showConfirm(message, onOk, onCancel, asNext = false) {
    // Add message to the queue
    message.type = 'confirm';
    if (asNext) this._messagesQueue = [message, ...this._messagesQueue];
    else this._messagesQueue.push(message);

    // Save action references
    this._awaitingActions.set(message.id, { onOk, onCancel });
  }
}

export const dialog = new Dialog();
