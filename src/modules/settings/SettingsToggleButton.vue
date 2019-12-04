<template>
  <q-btn
    class="q-ma-sm"
    dense
    flat
    icon="mdi-settings"
    @click="showSettingsDialog"
  />
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// Store modules
import { getModule } from 'vuex-module-decorators';
import SettingsStoreModule from './SettingsStoreModule';

@Component({
  components: {}
})
export default class SettingsToggleButton extends Vue {
  settings = getModule(SettingsStoreModule);

  showSettingsDialog() {
    this.settings.setIsDialogVisible(true);
  }
}
</script>
