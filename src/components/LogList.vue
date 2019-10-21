<template>
  <q-table
    :columns="columns"
    :data="log"
    :selected-rows-label="getSelectedString"
    :selected.sync="selected"
    dense
    hide-bottom
    row-key="id"
    selection="multiple"
    :pagination="{page: 1, rowsPerPage: 0}"
  />
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// Store modules
import { getModule} from 'vuex-module-decorators';
import LogStoreModule from '../modules/log/LogStoreModule';

// Others
import { ILogEntry } from '../modules/common/ILogEntry';

@Component
export default class LogList extends Vue {
  logStore: LogStoreModule = getModule(LogStoreModule);

  columns = [
    {
      name: 'timestamp',
      required: true,
      label: 'Timestamp',
      align: 'left',
      field: 'timestamp',
      format: (val: Date) => this.getFormattedDate(val),
    },
    {
      name: 'severity',
      required: true,
      label: 'Severity',
      align: 'left',
      field: 'severity',
    },
    {
      name: 'source',
      required: false,
      label: 'Source',
      align: 'left',
      field: 'source',
    },
    {
      name: 'message',
      required: false,
      label: 'Message',
      align: 'left',
      field: 'message',
    },
    {
      name: 'tags',
      required: false,
      label: 'Tags',
      align: 'left',
      field: 'tags',
      format: (val: string[]) => JSON.stringify(val),
    }
  ];

  get autoscroll(): boolean {
    return this.logStore.autoscroll;
  }

  get log(): ILogEntry[] {
    return this.logStore.filteredLog;
  }

  get selected(): ILogEntry[] {
    return this.logStore.selected;
  }

  set selected(selectedEntries: ILogEntry[]) {
    this.logStore.selectEntries(selectedEntries);
  }

  getSelectedString() {
    return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.logStore.filteredLog.length}`
  }

  getFormattedDate(date: Date): string {
    return `${date.getFullYear()}-${this.normalize(date.getMonth())}-${this.normalize(date.getDay())} ${this.normalize(date.getHours())}:${this.normalize(date.getMinutes())}:${this.normalize(date.getSeconds())} (${date.getMilliseconds()})`;
  }

  normalize(value: number): string {
    let text = `${value}`;
    if (text.length < 2) return `0${text}`;
    return text;
  }
}
</script>

<style></style>
