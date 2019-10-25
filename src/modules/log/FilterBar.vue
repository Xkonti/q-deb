<template>
  <q-toolbar>
    <q-input
      v-model="sourceFilter"
      @input="updateFilter"
      class="on-left"
      dark
      dense
      filled
      label="Source filter"
    />

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
      class="on-left"
      dark
      dense
      filled
      label="Tag filter"
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

@Component({
  components: {}
})
export default class FilterBar extends Vue {
  logStore = getModule(LogStoreModule);

  messageFilter: string = '';
  sourceFilter: string = '';
  tagFilter: string = '';

  getNullOrValue(value: string): string | null {
    if (value == null || value === '') return null;
    return value;
  }

  updateFilter() {
    const filter = new LogFilter();
    filter.messageFilter = this.getNullOrValue(this.messageFilter);
    filter.sourceFilter = this.getNullOrValue(this.sourceFilter);
    filter.tagFilter = this.getNullOrValue(this.tagFilter);
    filter.isActive =
      filter.messageFilter != null ||
      filter.sourceFilter != null ||
      filter.tagFilter != null;
    this.logStore.setFilter(filter);
  }
}
</script>
