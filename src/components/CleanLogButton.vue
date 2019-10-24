<template>
  <q-btn
    class="on-right"
    dense
    flat
    icon="mdi-spray-bottle"
    label="clean"
    @click="onClearLogClicked"
  >
    <q-tooltip>
      Clear log
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

  onClearLogClicked() {
    this.log.clearLogs();
  }
}
</script>
