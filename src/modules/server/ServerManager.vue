<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// Store modules
import { getModule } from 'vuex-module-decorators';
import ServerStoreModule from './ServerStoreModule';

// Electron
import { ipcRenderer } from 'electron';

// Others
import { ServerSettings } from './ServerSettings';
import { EServerStatus } from '../common/EServerStatus';

@Component
export default class ServerManager extends Vue {
  server = getModule(ServerStoreModule);

  areEventsRegistered = false;

  mounted() {
    if (this.areEventsRegistered) return;
    ipcRenderer.removeAllListeners('start-server-status');
    ipcRenderer.removeAllListeners('stop-server-status');
    ipcRenderer.on('start-server-status', this.onStartServerStatus);
    ipcRenderer.on('stop-server-status', this.onStopServerStatus);
    this.areEventsRegistered = false;

    // Auto-start the server
    this.server.startServer(new ServerSettings());
  }

  onStartServerStatus(event: object, arg: boolean) {
    if (arg) {
      this.server.setServerStatus(EServerStatus.On);
    } else {
      this.server.setServerStatus(EServerStatus.Off);
    }
  }

  onStopServerStatus(event: object, arg: boolean) {
    if (arg) {
      this.server.setServerStatus(EServerStatus.Off);
    } else {
      this.server.setServerStatus(EServerStatus.On);
    }
  }
}
</script>
