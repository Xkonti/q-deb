<template>
  <q-btn
    :icon="icon"
    :loading="isServerTransitioning"
    dense
    flat
    @click="toggleServer"
  >
    <q-tooltip> Server is {{ serverStatus }} </q-tooltip>
  </q-btn>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// Store modules
import { getModule } from 'vuex-module-decorators';
import ServerStoreModule from '../modules/server/ServerStoreModule';

@Component
export default class ServerToggle extends Vue {
  server = getModule(ServerStoreModule);

  get icon(): string {
    return this.isServerListening ? 'mdi-earth' : 'mdi-earth-off';
  }

  get isServerListening(): boolean {
    return this.server.status === 'on' || this.server.status === 'stopping';
  }

  get isServerTransitioning(): boolean {
    return (
      this.server.status === 'starting' || this.server.status === 'stopping'
    );
  }

  get serverStatus(): string {
    return this.server.status;
  }

  toggleServer() {
    if (this.server.status == 'on') this.server.stopServer();
    else if (this.server.status == 'off')
      this.server.startServer(this.server.settings);
  }
}
</script>
