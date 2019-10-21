import { ipcRenderer } from 'electron';

export class Clipboard {
  public static Copy(content: string): void {
    ipcRenderer.send('copyToClipboard', content);
  }
}
