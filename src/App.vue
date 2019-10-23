import { EServerStatus } from './modules/common/EServerStatus';
<template>
  <div id="q-app">
    <router-view />
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
import { EServerStatus } from './modules/common/EServerStatus';

@Component
export default class App extends Vue {
  logStore: LogStoreModule = getModule(LogStoreModule);

  mounted() {
    ipcRenderer.on('new-messages', this.onNewMessages);
    ipcRenderer.on('start-server-status', this.onStartServerStatus);
    ipcRenderer.on('stop-server-status', this.onStopServerStatus);

    // Refresh messages on an interval
    setInterval(() => ipcRenderer.send('get-new-messages', null), 100);
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

  onStartServerStatus(event: object, arg: boolean) {
    if (arg) {
      this.logStore.setServerStatus(EServerStatus.On);
    } else {
      this.logStore.setServerStatus(EServerStatus.Off);
    }
  }

  onStopServerStatus(event: object, arg: boolean) {
    if (arg) {
      this.logStore.setServerStatus(EServerStatus.Off);
    } else {
      this.logStore.setServerStatus(EServerStatus.On);
    }
  }
}
</script>

<style></style>
