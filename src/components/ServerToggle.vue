<template>
  <q-btn
    :icon="`mdi-${isServerListening ? 'earth' : 'earth-off'}`"
    :loading="isServerTransitioning"
    dense
    flat
    @click="toggleServer"
  >
    <q-tooltip>
      Server is {{serverStatus}}
    </q-tooltip>
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

  get serverStatus(): string {
    return this.server.status;
  }

  get isServerListening(): boolean {
    return this.server.status === 'on' || this.server.status === 'stopping';
  }

  get isServerTransitioning(): boolean {
    return (
      this.server.status === 'starting' || this.server.status === 'stopping'
    );
  }

  toggleServer() {
    if (this.server.status == 'on') this.server.stopServer();
    else if (this.server.status == 'off')
      this.server.startServer(this.server.settings);
  }
}
</script>
