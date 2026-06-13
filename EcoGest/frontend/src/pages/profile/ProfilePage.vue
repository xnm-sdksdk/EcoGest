<template>
  <q-page class="q-pa-md">
    <div class="row justify-between items-center q-pt-lg q-pb-xl q-pr-lg">
      <div class="text-h4">Perfil</div>
      <q-btn color="positive" unelevated @click="editProfile()">
        <q-icon left name="edit" />
        Editar Perfil
      </q-btn>
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
          <q-card bordered class="q-mb-lg" flat style="max-width: 600px">
            <div class="text-h5 q-pa-md">Projetos do Utilizador</div>
            <div class="q-pa-md" style="max-width: 350px">
              <q-list bordered separator>
                <q-item v-for="project in userProjects" :key="project.id" v-ripple clickable>
                  <q-item-section class="text-h7">{{ project.name }}</q-item-section>
                  <q-item-section class="text-h7">{{ project.schoolYear }}</q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card>
          <q-card bordered flat style="max-width: 600px">
            <div class="text-h5 q-pa-md">Atividades do Utilizador</div>
            <div class="q-pa-md" style="max-width: 350px">
              <q-list bordered separator>
                <q-item v-for="activity in userActivities" :key="activity.id" v-ripple clickable>
                  <q-item-section class="text-h7">{{ activity.name }}</q-item-section>
                </q-item>
              </q-list>
            </div>
          </q-card>
        </div>
      </div>
    </template>
  </q-page>
  <q-dialog v-model="openModal">
    <q-card style="width: 30rem">
      <q-card-section>
        <div class="text-h5">Editar Perfil</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input v-model="editProfileRef.name" label="Nome" label-color="white" outlined />
        <q-input v-model="editProfileRef.email" label="Email" label-color="white" outlined />
        <q-input
          v-model="editProfileRef.password"
          label="Nova Password"
          label-color="white"
          outlined
          type="password"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="openModal = false" />
        <q-btn :loading="submit" color="positive" label="Guardar" @click="saveEditedProfile()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useUser } from 'src/composables/useUser';
import { computed, onMounted, ref } from 'vue';
import { useAuthStore } from 'stores/auth';
import { useQuasar } from 'quasar';

const { data: users, loading, fetchUserById, updateUser } = useUser();

const authUser = useAuthStore();
const openModal = ref<boolean>(false);
const $q = useQuasar();
const userProjects = computed(() => users.value?.projects ?? []);
const userActivities = computed(() => users.value?.activities ?? []);
const submit = ref(false);

const editProfileRef = ref({
  name: '',
  email: '',
  password: '',
});

async function editProfile() {
  editProfileRef.value = {
    name: users.value?.name ?? '',
    email: users.value?.email ?? '',
    password: '',
  };
  openModal.value = true;
}

async function saveEditedProfile() {
  if (!authUser.user?.id) return;
  submit.value = true;
  try {
    const payload: { name?: string; email?: string; password?: string } = {
      name: editProfileRef.value.name,
      email: editProfileRef.value.email,
    };
    if (editProfileRef.value.password) {
      payload.password = editProfileRef.value.password;
    }
    await updateUser(authUser.user.id, payload);
    openModal.value = false;
    $q.notify({ type: 'positive', message: 'Perfil atualizado' });
    await fetchUserById(authUser.user.id);
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao atualizar perfil' });
  } finally {
    submit.value = false;
  }
}

onMounted(async () => {
  if (authUser.user?.id) {
    await fetchUserById(authUser.user.id);
  }
});
</script>
