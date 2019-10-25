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

  checkData() {
    ipcRenderer.send('get-dialog', null);
  }

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

  sendConfirmDialogResponse(dialogId: number, dialogResult: boolean) {
    ipcRenderer.send('dialog-confirm-response', {
      id: dialogId,
      result: dialogResult
    });
  }

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
