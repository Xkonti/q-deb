<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <MainToolbar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import MainToolbar from '../../components/MainToolbar.vue';

@Component({
  components: { MainToolbar }
})
export default class BasicLayout extends Vue {}
</script>
