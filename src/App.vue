import { EServerStatus } from './modules/common/EServerStatus';
<template>
  <div id="q-app">
    <router-view />
    <ServerManager />
  </div>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
// Store modules
import { getModule } from 'vuex-module-decorators';
import LogStoreModule from './modules/log/LogStoreModule';
// Electron
import { ipcRenderer } from 'electron';
// Other
import { ILogEntryDto } from './modules/common/ILogEntryDto';
import ServerManager from './modules/server/ServerManager.vue';
@Component({
  components: { ServerManager }
})
export default class App extends Vue {
  logStore = getModule(LogStoreModule);

  mounted() {
    ipcRenderer.removeAllListeners('new-messages');
    ipcRenderer.on('new-messages', this.onNewMessages);
    ipcRenderer.on('dialog-show', this.onDialogShow);

    // Refresh messages on an interval
    setInterval(() => ipcRenderer.send('get-new-messages', null), 100);
    setInterval(() => ipcRenderer.send('get-dialog', null), 100);
  }

  onNewMessages(event: object, arg: ILogEntryDto[]) {
    arg.forEach((message: ILogEntryDto) => {
      this.logStore.addNewEntry({
        id: message.id,
        exception: message.exception,
        level: message.level,
        message: message.message,
        source: message.source,
        tags: message.tags,
        timestamp: new Date(message.timestamp)
      });
    });
  }

  onDialogShow(event: object, arg: {type: string, message: string, title: string}) {
    if (arg == null) return;
    console.log(`${arg.type}: ${arg.title} - ${arg.message}`);
  }
}
</script>

<style></style>
