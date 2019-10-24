import { EServerStatus } from '../modules/common/EServerStatus'; import {
EServerStatus } from '../modules/common/EServerStatus';
<template>
  <q-toolbar>
    <q-input
      v-model="messageFilter"
      @input="updateFilter"
      class="on-left"
      dark
      dense
      filled
      label="Message filter"
    />

    <q-input
      v-model="tagFilter"
      @input="updateFilter"
      class="on-left"
      dark
      dense
      filled
      label="Tag filter"
    />

    <q-space/>

    <q-btn
      @click="onClearLogClicked"
      icon="mdi-spray-bottle"
      class="on-right"
      dense
      round
    >
      <q-tooltip>
        Clear log
      </q-tooltip>
    </q-btn>

    <ListeningToggle class="on-right"/>
    <AutoscrollToggle class="on-right"/>
    <SettingsButton class="on-right"/>
  </q-toolbar>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import ServerToggle from './ServerToggle.vue';

// Store modules
import { getModule } from 'vuex-module-decorators';
import LogStoreModule from '../modules/log/LogStoreModule';

// Others
import AutoscrollToggle from './AutoscrollToggle.vue';
import SettingsButton from './SettingsButton.vue';
import { LogFilter } from '../modules/log/LogFilter';

@Component({
  components: { AutoscrollToggle, ListeningToggle: ServerToggle, SettingsButton }
})
export default class MainToolbar extends Vue {
  logStore = getModule(LogStoreModule);

  messageFilter: string = '';
  tagFilter: string = '';

  getNullOrValue(value: string): string | null {
    if (value == null || value === '') return null;
    return value;
  }

  onClearLogClicked() {
    this.logStore.clearLogs();
  }

  updateFilter() {
    const filter = new LogFilter();
    filter.tagFilter = this.getNullOrValue(this.tagFilter);
    filter.messageFilter = this.getNullOrValue(this.messageFilter);
    filter.isActive = filter.tagFilter != null || filter.messageFilter != null;
    this.logStore.setFilter(filter);
  }
}
</script>
