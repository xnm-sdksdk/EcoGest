<template>
  <q-page class="q-pa-md">
    <div class="row justify-between items-center q-pt-lg q-pb-xl q-pr-lg">
      <div class="text-h4">Perfil</div>
    </div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner size="3em" />
    </div>

    <template v-else-if="users">
      <div class="row q-col q-mb-lg">
        <div class="col-12 col-sm-3 q-mr-lg">
          <q-card bordered flat style="max-width: 600px">
            <q-card-section class="row items-center q-gutter-md">
              <q-avatar color="primary" icon="person" size="80px" text-color="white" />
              <div>
                <div class="text-h5">{{ users.name }}</div>
                <div class="text-h7 text-grey">{{ users.email }}</div>
              </div>
            </q-card-section>

            <q-separator class="q-my-sm" color="grey" />

            <q-card-section>
              <q-list>
                <q-item>
                  <q-item-section avatar
                    ><q-icon color="white" name="badge" size="40px"
                  /></q-item-section>
                  <q-item-section>
                    <q-item-label class="text-h6 q-mb-sm">Perfil</q-item-label>
                    <q-item-label class="text-h6">{{ users.role }}</q-item-label>
                  </q-item-section>
                </q-item>
                <q-item class="q-mt-lg">
                  <q-item-section avatar
                    ><q-icon :color="users.active ? 'positive' : 'negative'" name="circle"
                  /></q-item-section>
                  <q-item-section>
                    <q-item-label class="text-h6 q-mb-sm">Estado</q-item-label>
                    <q-item-label class="text-h7">{{
                      users.active ? 'Ativo' : 'Inativo'
                    }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-8">
          <q-card bordered flat style="max-width: 600px">
            <div class="text-h5 q-pa-md">Projetos do Utilizador</div>
            <div class="q-pa-md" style="max-width: 350px">
              <q-list v-for="project in userProjects" :key="project.id" bordered separator>
                <q-item v-ripple clickable>
                  <q-item-section class="text-h7">{{ project.name }}</q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script lang="ts" setup>
import { useUser } from 'src/composables/useUser';
import { useQuasar } from 'quasar';
import { computed, onMounted } from 'vue';
import { useAuthStore } from 'stores/auth';

const { data: users, loading, fetchUserById } = useUser();
const $q = useQuasar();

const authUser = useAuthStore();

const userProjects = computed(() => users.value?.projects ?? []);

onMounted(async () => {
  if (authUser.user?.id) {
    await fetchUserById(authUser.user.id);
  }
});
</script>

<style scoped></style>
