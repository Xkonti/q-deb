<template>
  <q-btn :icon="icon" dense flat @click="toggleAutoscroll">
    <q-tooltip>
      Auto-scroll is {{ isAutoscrollOn ? 'active' : 'inactive' }}
    </q-tooltip>
  </q-btn>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// Store modules
import { getModule } from 'vuex-module-decorators';
import LogStoreModule from '../modules/log/LogStoreModule';

@Component
export default class AutoscrollToggle extends Vue {
  log = getModule(LogStoreModule);

  get icon(): string {
    return this.isAutoscrollOn
      ? 'mdi-format-vertical-align-bottom'
      : 'mdi-arrow-expand-vertical';
  }

  get isAutoscrollOn(): boolean {
    return this.log.autoscroll;
  }

  toggleAutoscroll() {
    this.log.setAutoscroll(!this.isAutoscrollOn);
  }
}
</script>
