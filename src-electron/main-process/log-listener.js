import * as fastifyModule from 'fastify';
import { dialog } from 'electron';

export default class LogListener {

  /**
   * Instance of the fastify server.
   * @private
   */
  _fastify = fastifyModule({ logger: false });
  /**
   * Url that the server will be listening on.
   * @type {string}
   * @private
   */
  _listeningUrl = '/*';

  /**
   * Port that the server will be listening on.
   * @type {number}
   * @private
   */
  _port = 33990;

  /**
   * A request callback
   * @type {function}
   * @private
   */
  _requestCallback = () => {};

  /**
   * Current status of the server.
   * @type {string}
   * @private
   */
  _status = 'off';

  /**
   * @param {string} listeningUrl
   * @param {number} port
   * @param {function} requestCallback
   */
  constructor(listeningUrl, port, requestCallback) {
    this._listeningUrl = listeningUrl || this._listeningUrl;
    this._port = port || this._port;
    this._requestCallback = requestCallback;
  }

  /**
   * Is the server off?
   * @returns {boolean}
   */
  get isOff() {
    return this._status === 'off';
  }

  /**
   * Is the server on?
   * @returns {boolean}
   */
  get isOn() {
    return this._status === 'on';
  }

  /**
   * Is the server in a process of turning on?
   * @returns {boolean}
   */
  get isStarting() {
    return this._status === 'starting';
  }

  /**
   * Is the server in a process of turning off?
   * @returns {boolean}
   */
  get isStopping() {
    return this._status === 'stopping';
  }

  /**
   * Gets server status as a string.
   * @returns {string}
   */
  get status() {
    return this._status;
  }

  /**
   * Start the server with provided request call.
   * @returns {Promise<boolean>}
   */
  async start() {
    if (this._status !== 'off') return false;
    try {
      this._status = 'starting';
      this._fastify.route({
        method: 'POST',
        url: this._listeningUrl,
        schema: {
          querystring: {
            severity: { type: 'string' }
          }
        },
        handler: async (request, reply) => {
          let isReceived = this._requestCallback(request, reply);
          return { result: isReceived };
        }
      });
      await this._fastify.listen(this._port);

      this._status = 'on';
      return true;
    } catch (err) {
      this._status = 'off';
      this.showDialog(`ll: Encountered error when starting the server: ${err}`);
      throw new Error(`Encountered an error when starting server on port ${this._port}: ${err}`);
    }
  }

  /**
   * Stop the running server.
   * @returns {Promise<boolean>}
   */
  async stop() {
    if (this._status !== 'on') return false;
    this._status = 'stopping';
    await this._fastify.close();
    this._status = 'off';
    return true;
  }

  showDialog(message) {
    dialog.showMessageBox({
      title: 'Got new message',
      message: message
    });
  }
}
