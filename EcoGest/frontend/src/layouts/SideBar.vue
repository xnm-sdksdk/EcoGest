<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="drawer" persistent show-if-above>
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item v-ripple clickable exact to="/">
            <q-item-section avatar>
              <q-icon name="dashboard" />
            </q-item-section>
            <q-item-section>Dashboard</q-item-section>
          </q-item>
          <q-item v-ripple clickable to="/activities">
            <q-item-section avatar>
              <q-icon name="event" />
            </q-item-section>
            <q-item-section>Plano de Atividades</q-item-section>
          </q-item>
          <q-item v-ripple clickable to="/meetings">
            <q-item-section avatar>
              <q-icon name="groups" />
            </q-item-section>
            <q-item-section>Reuniões</q-item-section>
          </q-item>
          <q-item v-ripple clickable to="/gamification">
            <q-item-section avatar>
              <q-icon name="emoji_events" />
            </q-item-section>
            <q-item-section>Gamificação</q-item-section>
          </q-item>
          <q-item v-ripple clickable to="/proceedings">
            <q-item-section avatar>
              <q-icon name="fact_check" />
            </q-item-section>
            <q-item-section>Auditoria</q-item-section>
          </q-item>
          <q-item v-ripple clickable to="/reports">
            <q-item-section avatar>
              <q-icon name="description" />
            </q-item-section>
            <q-item-section>Relatório Final</q-item-section>
          </q-item>
          <q-item v-ripple clickable to="/settings">
            <q-item-section avatar>
              <q-icon name="settings" />
            </q-item-section>
            <q-item-section>Definições</q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const drawer = ref(true);
</script>

<style scoped></style>
