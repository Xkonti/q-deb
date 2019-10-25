import { ipcMain } from 'electron';

class Dialog {
  /**
   * A queue of messages;
   * @type {DialogMessage[]}
   * @private
   */
  _messagesQueue = [];

  /**
   * A list of dialog actions awaiting user response.
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
   * Action performed when view thread finished
   * @param {object} event Event.
   * @param {{id: number, result: boolean}} arg A value indicating user's choice.
   * @private
   */
  _onConfirmResponse(event, arg) {
    const id = arg.id;
    const actions = this._awaitingActions.get(id);
    if (actions == null) return;
    this._awaitingActions.delete(id);
    if (arg.result) actions.onOk(id);
    else actions.onCancel(id);
  }

  /**
   * Adds a message to the queue.
   * @param {DialogMessage} message A message to show.
   * @param {boolean} asNext A value indicating whether this dialog should be
   * put in front of the line.
   */
  showAlert(message, asNext = false) {
    message.type = 'alert';
    if (asNext) this._messagesQueue = [message, ...this._messagesQueue];
    else this._messagesQueue.push(message);
  }

  /**
   * Adds a confirm message to the queue.
   * @param {DialogMessage} message A message to show.
   * @param {function(number)} onOk An action performed when user chooses OK.
   * @param {function(number)} onCancel An action performed when user chooses CANCEL.
   * @param {boolean} asNext A value indicating whether this dialog should be
   * put in front of the line.
   */
  showConfirm(message, onOk, onCancel = null, asNext = false) {
    // Add message to the queue
    message.type = 'confirm';
    if (asNext) this._messagesQueue = [message, ...this._messagesQueue];
    else this._messagesQueue.push(message);

    // Save action references
    this._awaitingActions.set(message.id, { onOk, onCancel });
  }
}

export const dialog = new Dialog();
