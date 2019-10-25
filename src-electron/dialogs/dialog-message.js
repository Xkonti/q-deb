import { nextNumber } from '../helpers/unique-ids';

/**
 * A class representing a dialog data.
 */
export class DialogMessage {
  /**
   * Create ne dialog message.
   * @param {string} message A message to display.
   * @param {string} title A title for the message.
   */
  constructor(message = '', title = 'Message') {
    /**
     * Id of the message.
     * @type {number}
     */
    this.id = nextNumber();

    /**
     * A message to display.
     * @type {string}
     */
    this.message = message;

    /**
     * A title for the message.
     * @type {string}
     */
    this.title = title;

    /**
     * A type of the message.
     * @type {'alert' | 'confirm' | 'prompt'}
     */
    this.type = 'alert';
  }
}
