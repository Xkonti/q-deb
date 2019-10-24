<template>
  <q-btn
    :disable="true"
    class="q-ma-sm"
    dense
    flat
    icon="mdi-settings"
    @click="onSettingsButtonClick"
  />
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// Store modules
import { getModule } from 'vuex-module-decorators';
import ServerStoreModule from '../modules/server/ServerStoreModule';

@Component({
  components: {}
})
export default class SettingsButton extends Vue {
  serverStore = getModule(ServerStoreModule);

  onSettingsButtonClick() {
    // Do something!
  }
}
</script>
