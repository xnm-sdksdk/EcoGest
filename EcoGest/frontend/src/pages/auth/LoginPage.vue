<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-lg" style="width: 600px">
      <q-card-section>
        <div class="text-h5 text-center">EcoGest</div>
        <div class="text-subtitle2 text-center text-grey-7">
          Plataforma de Apoio ao Programa Eco-Escolas
        </div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md" @submit="''">
          <q-input
            v-model="email"
            label="E-mail"
            outlined
            placeholder="nome@esmad.ipp.pt"
            type="email"
          />
          <q-input v-model="password" label="Password" outlined type="password" />

          <q-btn class="full-width" color="primary" label="Entrar" type="submit" />

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
import { ref } from 'vue'; /*import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();*/
/*import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';

const router = useRouter();
const $q = useQuasar();*/
const email = ref('');
const password = ref('');
</script>

<style scoped></style>
