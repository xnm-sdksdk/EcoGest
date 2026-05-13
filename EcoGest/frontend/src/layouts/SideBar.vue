<template>
  <div class="">
    <q-layout
      class="shadow-2 rounded-borders"
      container
      pweaia
      style="height: 300px"
      view="lHh Lpr lff"
    >
      <q-drawer v-model="drawer" persistent>
        <q-scroll-area
          class="q-pa-md"
          style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd"
        >
          <q-list padding>
            <q-item v-ripple clickable>
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>

              <q-item-section> Dashboard </q-item-section>
            </q-item>

            <q-item v-ripple active clickable>
              <q-item-section avatar>
                <q-icon name="activities" />
              </q-item-section>

              <q-item-section> Plano de Atividades </q-item-section>
            </q-item>

            <q-item v-ripple active clickable>
              <q-item-section avatar>
                <q-icon name="meetings" />
              </q-item-section>

              <q-item-section> Reuniões </q-item-section>
            </q-item>

            <q-item v-ripple active clickable>
              <q-item-section avatar>
                <q-icon name="gamification" />
              </q-item-section>

              <q-item-section> Gamificação </q-item-section>
            </q-item>

            <q-item v-ripple active clickable>
              <q-item-section avatar>
                <q-icon name="audit" />
              </q-item-section>

              <q-item-section> Auditoria </q-item-section>
            </q-item>

            <q-item v-ripple active clickable>
              <q-item-section avatar>
                <q-icon name="report" />
              </q-item-section>

              <q-item-section> Relatório Final </q-item-section>
            </q-item>

            <q-item v-ripple active clickable>
              <q-item-section avatar>
                <q-icon name="settings" />
              </q-item-section>

              <q-item-section> Definições </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    </q-layout>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>

<style scoped></style>
