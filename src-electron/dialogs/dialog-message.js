import { nextNumber } from '../helpers/unique-ids';

/**
 * A class representing dialog data.
 */
export class DialogMessage {
  /**
   * Create ne dialog message.
   * @param {string} message A message to display.
   * @param {string} title A title for the message.
   */
  constructor(message = '', title = 'Message') {
    /**
     * Id of the dialog.
     * @type {number}
     */
    this.id = nextNumber();

    /**
     * A message to display.
     * @type {string}
     */
    this.message = message;

    /**
     * A title of the dialog.
     * @type {string}
     */
    this.title = title;

    /**
     * A type of the dialog.
     * @type {'alert' | 'confirm'}
     */
    this.type = 'alert';
  }
}
