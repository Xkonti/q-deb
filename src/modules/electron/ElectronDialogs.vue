<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// Electron
import { ipcRenderer } from 'electron';

// Others
import { DialogMessage } from './DialogMessage';
import { DialogType } from './DialogType';

@Component
export default class ElectronDialogs extends Vue {
  areEventsRegistered = false;

  /**
   * Sends request to the main thread for next dialog.
   */
  checkData() {
    ipcRenderer.send('get-dialog', null);
  }

  /**
   * Action performed when main thread sends back data for the next dialog to show.
   * @param event Event data.
   * @param data Dialog data.
   */
  onDialogShow(event: object, data: DialogMessage) {
    if (data == null) {
      setTimeout(this.checkData, 100);
      return;
    }

    switch (data.type) {
      case DialogType.Alert:
        this.showAlert(data);
        break;
      case DialogType.Confirm:
        this.showConfirm(data);
        break;
      default:
        console.error(`Unknown dialog type: ${data.type}`);
        setTimeout(this.checkData, 100);
        break;
    }
  }

  mounted() {
    if (this.areEventsRegistered) return;
    ipcRenderer.removeAllListeners('dialog-show');
    ipcRenderer.on('dialog-show', this.onDialogShow);
    this.checkData();
    this.areEventsRegistered = true;
  }

  /**
   * Sends confirm dialog result back to the main thread.
   * @param dialogId Id of the dialog this response refers to.
   * @param dialogResult User's input: `true` = `OK`; `false` = `CANCEL`;
   */
  sendConfirmDialogResponse(dialogId: number, dialogResult: boolean) {
    ipcRenderer.send('dialog-confirm-response', {
      id: dialogId,
      result: dialogResult
    });
  }

  /**
   * Shows alert dialog. This is the simplest dialog that shows the message to the user.
   * Nothing is sent back to the main thread.
   * @param data Dialog data.
   */
  showAlert(data: DialogMessage) {
    this.$q
      .dialog({
        title: data.title,
        message: data.message,
        persistent: true,
        noBackdropDismiss: true,
        noEscDismiss: false
      })
      .onDismiss(() => {
        this.checkData();
      });
  }

  /**
   * Shows confirm dialog. This dialog requires from the user to select the `Ok` or `Cancel` option.
   * User's input is sent back to the main thread, so it can react accordingly.
   * @param data Dialog data.
   */
  showConfirm(data: DialogMessage) {
    this.$q
      .dialog({
        title: data.title,
        message: data.message,
        persistent: true,
        noBackdropDismiss: true,
        noEscDismiss: true,
        cancel: true,
        ok: true
      })
      .onOk(() => {
        this.sendConfirmDialogResponse(data.id, true);
      })
      .onCancel(() => {
        this.sendConfirmDialogResponse(data.id, false);
      })
      .onDismiss(() => {
        this.checkData();
      });
  }
}
</script>
