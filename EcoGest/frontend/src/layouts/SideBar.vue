<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer v-model="drawer" persistent show-if-above>
      <q-scroll-area class="fit">
        <q-item class="q-pa-lg" to="/">
          <q-item-section>
            <div class="text-h2">EcoGest</div>
            <div class="text-h5">2025/2026</div></q-item-section
          >
        </q-item>
        <q-separator />
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
          <q-item v-ripple clickable to="/audits">
            <q-item-section avatar>
              <q-icon name="assignment" />
            </q-item-section>
            <q-item-section>Questionários</q-item-section>
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
          <q-separator class="q-mt-xl" style="margin-top: 200px" />
          <q-item v-if="userAuth.user" v-ripple clickable to="/profile">
            <q-item-section avatar style="height: 170px; width: 260px">
              <q-img style="height: 200px">
                <div class="absolute-bottom bg-transparent">
                  <q-avatar class="q-mb-sm" size="56px">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                  </q-avatar>
                  <div class="text-weight-bold text-h6 q-mb-sm">{{ userAuth.user.name }}</div>
                  <div class="text-h6 q-mb-sm">{{ userAuth.user.email }}</div>
                </div>
              </q-img>
            </q-item-section>
          </q-item>
          <q-item
            v-if="userAuth.user"
            clickable
            @click="
              userAuth.logout();
              $router.push('/login');
            "
          >
            <q-item-section avatar><q-icon name="logout" /></q-item-section>
            <q-item-section>Logout</q-item-section>
          </q-item>

          <q-item v-if="!userAuth.user" clickable to="/login">
            <q-item-section avatar><q-icon name="login" /></q-item-section>
            <q-item-section>Login</q-item-section>
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
import { onMounted, ref } from 'vue';
import { useAuthStore } from 'stores/auth';

const userAuth = useAuthStore();
const drawer = ref(true);

onMounted(() => {
  userAuth.loadFromStorage();
});
</script>

<style scoped>
.text-h5 {
  color: $primary;
}
</style>
