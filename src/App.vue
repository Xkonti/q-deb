<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component,  } from 'vue-property-decorator';

// Store modules
import { getModule} from 'vuex-module-decorators';
import LogStoreModule from './modules/log/LogStoreModule';

// Electron
import { ipcRenderer } from 'electron';

// Other
import { ILogEntryDto } from './modules/common/ILogEntryDto';

@Component
export default class App extends Vue {
  logStore: LogStoreModule = getModule(LogStoreModule);

  mounted() {
    ipcRenderer.on('new-messages', this.onNewMessages);

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
}
</script>

<style></style>
