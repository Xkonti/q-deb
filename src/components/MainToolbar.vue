<template>
  <q-bar class="q-electron-drag">
    <div>{{ title }}</div>

    <q-space />

    <CleanLogButton class="on-left" />
    <ServerToggle class="on-left" />
    <AutoscrollToggle class="on-left" />
    <SettingsButton class="on-left" />

    <q-btn dense flat icon="minimize" @click="minimize" class="on-right" />
    <q-btn dense flat icon="crop_square" @click="maximize" />
    <q-btn dense flat icon="close" @click="closeApp" />
  </q-bar>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import AutoscrollToggle from './AutoscrollToggle.vue';
import CleanLogButton from './CleanLogButton.vue';
import ServerToggle from './ServerToggle.vue';
import SettingsButton from './SettingsButton.vue';

// Store modules
import { getModule } from 'vuex-module-decorators';
import LogStoreModule from '../modules/log/LogStoreModule';

@Component({
  components: { SettingsButton, AutoscrollToggle, ServerToggle, CleanLogButton }
})
export default class MainToolbar extends Vue {
  log = getModule(LogStoreModule);

  get title() {
    return `${this.$q.electron.remote.app.getName()} ${this.$q.electron.remote.app.getVersion()}`;
  }

  minimize() {
    if (process.env.MODE === 'electron') {
      this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize();
    }
  }

  maximize() {
    if (process.env.MODE === 'electron') {
      const window = this.$q.electron.remote.BrowserWindow.getFocusedWindow();

      if (window.isMaximized()) {
        window.unmaximize();
      } else {
        window.maximize();
      }
    }
  }

  closeApp() {
    if (process.env.MODE === 'electron') {
      this.$q.electron.remote.BrowserWindow.getFocusedWindow().close();
    }
  }
}
</script>
