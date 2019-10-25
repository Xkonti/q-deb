import { DialogType } from './DialogType';

export class DialogMessage {
  public id: number = 0;
  public message: string = '';
  public title: string = 'Message';
  public type: DialogType = DialogType.Alert;
}
