import { DialogType } from './DialogType';

/**
 * A class describing dialog data sent from main thread.
 */
export class DialogMessage {
  /**
   * Unique ID of the dialog.
   */
  public id: number = 0;

  /**
   * A message to display.
   */
  public message: string = '';

  /**
   * Title of the dialog.
   */
  public title: string = 'Message';

  /**
   * Type of the dialog.
   */
  public type: DialogType = DialogType.Alert;
}
