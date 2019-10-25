/**
 * Types of dialogs supported by main thread.
 */
export enum DialogType {
  /**
   * Simple message shown to the user.
   */
  Alert = 'alert',

  /**
   * A message to which user has to answer "Ok" or "Cancel".
   * User's input is sent back to the main thread.
   */
  Confirm = 'confirm'
}
