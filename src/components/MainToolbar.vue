<template>
  <q-toolbar>
    <q-toolbar-title>
      QDeb
    </q-toolbar-title>

    <q-input
      v-model="messageFilter"
      @input="updateFilter"
      class="q-ma-xs"
      dark
      dense
      filled
      label="Message filter"
    />

    <q-input
      v-model="tagFilter"
      @input="updateFilter"
      class="q-ma-xs"
      dark
      dense
      filled
      label="Tag filter"
    />

    <q-btn
      :disable="selectedLogEntriesCount === 0"
      @click="onSerializeSelectedClicked"
      class="q-ma-sm"
      dense
      flat
      icon="mdi-json"
      label="Serialize selected"
      size="small"
    />
    <q-btn
      :disable="selectedLogEntriesCount !== 1"
      @click="onCopyMessageClicked"
      class="q-ma-sm"
      dense
      flat
      icon="mdi-content-copy"
      label="Copy message"
      size="small"
    />
    <q-btn
      @click="onClearLogClicked"
      icon="mdi-spray-bottle"
      class="q-ma-sm"
      dense
      flat
      label="Clear log"
      size="small"
    />
    <q-btn
      dense
      :icon="`mdi-${autoscroll ? 'format-vertical-align-bottom' : 'arrow-expand-vertical'}`"
      @click="toggleAutoscroll"
      round
    />
  </q-toolbar>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// Store modules
import { getModule } from 'vuex-module-decorators';
import LogStoreModule from '../modules/log/LogStoreModule';
import { ILogEntry } from '../modules/common/ILogEntry';

// Others
import { Clipboard } from '../modules/common/Clipboard';
import { LogFilter } from '../modules/log/LogFilter';

@Component({
  components: {}
})
export default class MainToolbar extends Vue {
  logStore: LogStoreModule = getModule(LogStoreModule);

  messageFilter: string = '';
  tagFilter: string = '';

  get autoscroll(): boolean {
    return this.logStore.autoscroll;
  }

  get selectedLogEntries(): ILogEntry[] {
    return this.logStore.selected;
  }

  get selectedLogEntriesCount(): number {
    return this.selectedLogEntries.length;
  }

  getNullOrValue(value: string): string | null {
    if (value == null || value === '') return null;
    return value;
  }

  onClearLogClicked() {
    this.logStore.clearLogs();
  }

  onCopyMessageClicked() {
    Clipboard.Copy(this.selectedLogEntries[0].message);
  }

  onSerializeSelectedClicked() {
    Clipboard.Copy(JSON.stringify(this.selectedLogEntries));
  }

  toggleAutoscroll() {
    this.logStore.setAutoscroll(!this.autoscroll);
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
