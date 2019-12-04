<template>
  <q-dialog v-model="isVisible" persistent>
    <q-card style="width: 500px" class="q-px-sm q-pb-md">
      <q-card-section>
        <div class="text-h6">Settings</div>
      </q-card-section>

      <q-item-label header>Server</q-item-label>
      <q-item dense>
        <q-item-section avatar>
          <q-icon name="volume_up" />
        </q-item-section>
        <q-item-section>
          HOHOHO!
        </q-item-section>
      </q-item>

      <q-item-label header>Log list</q-item-label>
      <q-item dense>
        <q-item-section avatar>
          <q-icon name="volume_up" />
        </q-item-section>
        <q-item-section>
          HOHOHO!
        </q-item-section>
      </q-item>

      <q-card-actions align="right">
        <q-btn flat label="Decline" color="primary" v-close-popup />
        <q-btn flat label="Accept" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// Store modules
import { getModule } from 'vuex-module-decorators';
import SettingsStoreModule from './SettingsStoreModule';

// Others

@Component({
  components: {}
})
export default class SettingsDialog extends Vue {
  settings = getModule(SettingsStoreModule);

  get isVisible() {
    return this.settings.isDialogVisible;
  }

  set isVisible(newValue: boolean) {
    this.settings.setIsDialogVisible(newValue);
  }
}
</script>
