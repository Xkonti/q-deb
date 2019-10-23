<template>
  <q-virtual-scroll
    type="table"
    :virtual-scroll-item-size="23"
    :virtual-scroll-slice-size="80"
    :items="log"
    ref="logList"
    dense
    separator="cell"
    square
    wrap-cells
  >
    <template v-slot:before>
      <thead class="thead-sticky text-left">
        <tr>
          <th style="width: 50px; text-align: center">Level</th>
          <th style="width: 170px">Time Stamp</th>
          <th style="width: 150px">Source</th>
          <th>Message</th>
          <th style="width: 200px">Tags</th>
        </tr>
      </thead>
    </template>

    <template v-slot="{ item: row, index }" class="text-left">
      <tr
        :key="index"
        :class="
          `${getLevelRowBgColor(row.level)} ${getLevelRowTextColor(row.level)}`
        "
      >
        <td>
          <q-chip
            :color="getLevelChipBgColor(row.level)"
            :text-color="getLevelChipTextColor(row.level)"
            dense
            square
          >
            {{ row.level }}
          </q-chip>
        </td>
        <td>{{ getFormattedDate(row.timestamp) }}</td>
        <td>{{ row.source }}</td>
        <td>{{ row.message }}</td>
        <td>
          <span v-for="tag in row.tags" :key="tag">
            <q-chip dense square class="q-py-none q-px-xs">
              {{ tag }}
            </q-chip>
          </span>
        </td>
      </tr>
    </template>
  </q-virtual-scroll>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component, Watch } from 'vue-property-decorator';
import { QVirtualScroll } from 'quasar';

// Store modules
import { getModule } from 'vuex-module-decorators';
import LogStoreModule from './LogStoreModule';

// Others
import { ILogEntry } from '../common/ILogEntry';

@Component
export default class LogEntryList extends Vue {
  logStore: LogStoreModule = getModule(LogStoreModule);
  bottomRowIndex: number = 0;

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
    return this.selected.length === 0
      ? ''
      : `${this.selected.length} record${
        this.selected.length > 1 ? 's' : ''
      } selected of ${this.logStore.filteredLog.length}`;
  }

  getFormattedDate(date: Date): string {
    return `${date.getFullYear()}-${this.normalize(
      date.getMonth()
    )}-${this.normalize(date.getDay())} ${this.normalize(
      date.getHours()
    )}:${this.normalize(date.getMinutes())}:${this.normalize(
      date.getSeconds()
    )} (${date.getMilliseconds()})`;
  }

  getLevelRowBgColor(level: string): string {
    const normalizedLevel = level == null ? '' : level.toLowerCase();
    switch (normalizedLevel) {
      case 'error':
        return 'bg-red-3';
      case 'critical':
        return 'bg-red-14';
      case 'warn':
        return 'bg-yellow-2';
    }

    return 'white';
  }

  getLevelRowTextColor(level: string): string {
    const normalizedLevel = level == null ? '' : level.toLowerCase();
    switch (normalizedLevel) {
      case 'trace':
        return 'text-grey-7';
      case 'critical':
        return 'text-white';
    }

    return 'text-black';
  }

  getLevelChipBgColor(level: string): string {
    const normalizedLevel = level == null ? '' : level.toLowerCase();
    switch (normalizedLevel) {
      case 'info':
        return 'blue-3';
      case 'error':
        return 'red-10';
      case 'critical':
        return 'yellow';
      case 'warn':
        return 'amber-4';
      case 'debug':
        return 'light-green-2';
    }

    return 'grey-2';
  }

  getLevelChipTextColor(level: string): string {
    const normalizedLevel = level == null ? '' : level.toLowerCase();
    switch (normalizedLevel) {
      case 'error':
        return 'white';
    }

    return 'black';
  }

  normalize(value: number): string {
    let text = `${value}`;
    if (text.length < 2) return `0${text}`;
    return text;
  }

  @Watch('log')
  onLogChanged(/*value: ILogEntry[], oldValue: ILogEntry[]*/) {
    if (this.autoscroll) {
      const logList = this.$refs.logList as QVirtualScroll;
      logList.scrollTo(this.log.length);
    }
  }
}
</script>

<style lang="stylus">
.thead-sticky tr > *
  position sticky
  opacity 1
  z-index 1
  background black
  color white

.thead-sticky tr:last-child > *
  top 0
</style>
