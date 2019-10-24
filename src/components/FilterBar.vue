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
import LogStoreModule from '../modules/log/LogStoreModule';

// Others
import { LogFilter } from '../modules/log/LogFilter';

@Component({
  components: {}
})
export default class FilterBar extends Vue {
  logStore = getModule(LogStoreModule);

  messageFilter: string = '';
  tagFilter: string = '';

  getNullOrValue(value: string): string | null {
    if (value == null || value === '') return null;
    return value;
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
