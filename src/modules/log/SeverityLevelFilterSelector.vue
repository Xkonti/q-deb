<template>
  <q-select
    v-model="selectedLevels"
    :bg-color="(selectedLevels != null && selectedLevels.length > 0) ? 'accent' : 'primary'"
    :options="filteredLevels"
    class="on-left"
    clearable
    dense
    input-debounce="0"
    label="Severity filter"
    multiple
    standout="bg-accent text-white"
    use-input
    use-chips
    @new-value="addNewLevel"
    @filter="levelFilteringFunction"
  />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, PropSync } from 'vue-property-decorator';

@Component({
  components: {}
})
export default class SeverityLevelFilterSelector extends Vue {

  @PropSync(
    'selected',
    {
      type: Array,
      required: true
    }
  )
  selectedLevels!: string[];

  readonly defaultLevels = [
    'trace',
    'debug',
    'info',
    'warn',
    'error',
    'critical'
  ];

  additionalLevels: string[] = [];
  levelFilter: string = '';

  get availableLevels(): string[] {
    return [...this.defaultLevels, ...this.additionalLevels];
  }

  get filteredLevels(): string[] {
    if (this.levelFilter == '' || this.levelFilter == null)
      return this.availableLevels;
    return this.availableLevels.filter(level =>
      level.includes(this.levelFilter)
    );
  }

  addNewLevel(
    newLevel: string,
    done: (value: string, actionType: string) => void
  ) {
    if (newLevel == null || newLevel.length < 1) return;
    newLevel = newLevel.toLowerCase();
    if (!this.availableLevels.includes(newLevel)) {
      this.additionalLevels.push(newLevel);
    }
    done(newLevel, 'toggle');
  }

  levelFilteringFunction(filter: string, update: (fun: () => void) => void) {
    update(() => {
      this.levelFilter = filter.toLowerCase();
    });
  }
}
</script>
