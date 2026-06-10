<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-lg" style="width: 600px">
      <q-card-section>
        <div class="text-h5 text-center">EcoGest</div>
        <div class="text-subtitle2 text-center text-grey-7">
          Plataforma de Apoio ao Programa Eco-Escolas
        </div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md" @submit.prevent="handleLogin()">
          <q-input
            v-model="email"
            label="E-mail"
            label-color="white"
            outlined
            placeholder="nome@esmad.ipp.pt"
            type="email"
          />
          <q-input
            v-model="password"
            label="Password"
            label-color="white"
            outlined
            type="password"
          />

          <div>
            <q-btn
              :loading="loading"
              class="full-width"
              color="primary"
              label="Entrar"
              type="submit"
            />
          </div>

          <div class="text-center">
            <router-link class="text-primary" to="/recover-password">
              Esqueci-me da password
            </router-link>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useAuthStore } from 'stores/auth';

const router = useRouter();
const $q = useQuasar();
const auth = useAuthStore();

const email = ref('');
const password = ref('');
const loading = ref(false);

async function handleLogin() {
  loading.value = true;
  const success = await auth.login(email.value, password.value);
  loading.value = false;

  if (success) {
    await router.push('/');
  } else {
    $q.notify({ type: 'negative', message: 'Credenciais inválidas' });
  }
}
</script>

<style scoped></style>
