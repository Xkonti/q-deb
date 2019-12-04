<template>
  <q-btn
    :color="color"
    :icon="icon"
    dense
    flat
    @click="toggleFiltersBar"
  >
    <q-tooltip>
      Toggle filters bar.
    </q-tooltip>
  </q-btn>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

// Store modules
import { getModule } from 'vuex-module-decorators';
import LogStoreModule from './LogStoreModule';

@Component
export default class FiltersToggleButton extends Vue {
  logStore = getModule(LogStoreModule);

  get icon(): string {
    return this.isFilterBarActive ? 'mdi-filter' : 'mdi-filter-outline';
  }

  get color(): string {
    return this.isFiltering ? 'accent' : '';
  }

  get isFilterBarActive() {
    return this.logStore.showFilterBar;
  }

  get isFiltering() {
    return this.logStore.filter != null && this.logStore.filter.isActive;
  }

  toggleFiltersBar() {
    this.logStore.setShowFilterBar(!this.isFilterBarActive);
  }
}
</script>
