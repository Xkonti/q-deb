<template>
  <q-page class="flex column" ref="page">
    <q-resize-observer @resize="updateMaxHeight" :debounce="500"/>
    <LogEntryList :style="minPageHeight == null ? '' : `max-height: ${minPageHeight}px`"/>
  </q-page>
</template>

<script lang="ts">
// Vue
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import LogEntryList from '../modules/log/LogEntryList.vue';

@Component({
  components: { LogEntryList }
})
export default class IndexPage extends Vue {

  minPageHeight: number | null = null;

  updateMaxHeight() {
    const height = this.getMinPageHeight();
    this.minPageHeight = height - 1;
  }

  getMinPageHeight(): number {
    const page = this.$refs.page as Vue;
    const styles =  window.getComputedStyle(page.$el);
    const minHeight = styles.getPropertyValue('min-height');
    return +minHeight.substring(0, minHeight.length - 2);
  }

}
</script>
