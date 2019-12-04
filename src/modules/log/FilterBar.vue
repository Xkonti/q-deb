<template>
  <q-toolbar :class="$q.dark.isActive ? 'bg-dark' : 'bg-primary'">
    <SeverityLevelFilterSelector :selected.sync=severityFilter @update:selected="onSeverityFilterChange"/>

    <q-input
      v-model="sourceFilter"
      :bg-color="(sourceFilter != null && sourceFilter !== '') ? 'accent' : 'primary'"
      class="on-left"
      clearable
      dense
      standout="bg-accent text-white"
      label="Source filter"
      @input="updateFilter"
    />

    <q-input
      v-model="messageFilter"
      :bg-color="(messageFilter != null && messageFilter !== '') ? 'accent' : 'primary'"
      class="on-left"
      clearable
      dense
      label="Message filter"
      standout="bg-accent text-white"
      @input="updateFilter"
    />

    <q-input
      v-model="tagFilter"
      :bg-color="(tagFilter != null && tagFilter !== '') ? 'accent' : 'primary'"
      class="on-left"
      clearable
      dense
      label="Tag filter"
      standout="bg-accent text-white"
      @input="updateFilter"
    />
  </q-toolbar>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// Store modules
import { getModule } from 'vuex-module-decorators';
import LogStoreModule from './LogStoreModule';

// Others
import { LogFilter } from './LogFilter';
import SeverityLevelFilterSelector from './SeverityLevelFilterSelector.vue';

@Component({
  components: { SeverityLevelFilterSelector }
})
export default class FilterBar extends Vue {
  logStore = getModule(LogStoreModule);

  messageFilter: string = '';
  severityFilter: string[] = [];
  sourceFilter: string = '';
  tagFilter: string = '';

  get isAnyFilter() {
    return this.isMessageFilter || this.isSeverityFilter || this.isSourceFilter || this.isTagFilter;
  }

  get isMessageFilter() {
    return this.messageFilter != null && this.messageFilter !== '';
  }

  get isSeverityFilter() {
    return this.severityFilter != null && this.severityFilter.length > 0;
  }

  get isSourceFilter() {
    return this.sourceFilter != null && this.sourceFilter !== '';
  }

  get isTagFilter() {
    return this.tagFilter != null && this.tagFilter !== '';
  }

  getNullOrValue(value: string): string | null {
    if (value == null || value === '') return null;
    return value;
  }

  onSeverityFilterChange() {
    this.updateFilter();
  }

  updateFilter() {
    const filter = new LogFilter();
    filter.messageFilter = this.getNullOrValue(this.messageFilter);
    filter.sourceFilter = this.getNullOrValue(this.sourceFilter);
    filter.severityFilter = this.severityFilter || [];
    filter.tagFilter = this.getNullOrValue(this.tagFilter);
    filter.isActive =
      filter.messageFilter != null ||
      filter.sourceFilter != null ||
      filter.severityFilter.length > 0 ||
      filter.tagFilter != null;
    this.logStore.setFilter(filter);
  }
}
</script>
