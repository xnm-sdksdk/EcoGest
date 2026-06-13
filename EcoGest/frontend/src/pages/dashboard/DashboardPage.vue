<template>
  <q-page class="q-pa-md">
    <div class="row justify-between items-center q-pt-lg q-pb-xl q-pr-lg">
      <div class="text-h4">Dashboard</div>
      <q-btn :disable="!manageProjects" color="positive" unelevated @click="createProject()">
        <q-icon left name="add" />
        Novo Projeto
      </q-btn>
    </div>
    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner size="3em" />
    </div>
    <template v-else>
      <div class="row q-col q-mb-lg">
        <q-select
          v-model="selectProject"
          :options="projects"
          clearable
          dense
          emit-value
          label="Selecionar projeto"
          label-color="white"
          map-options
          option-label="name"
          option-value="id"
          outlined
          style="min-width: 180px"
        />
      </div>
      <div class="row q-col-gutter-md q-mb-xl">
        <div class="col-12 col-sm-3">
          <q-card class="q-pa-lg">
            <q-card-section>
              <div class="text-h5 text-center q-pb-md">Atividades planeadas</div>
              <div class="text-h3 text-center">{{ data?.upcomingActivities ?? 0 }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-3">
          <q-card class="q-pa-lg">
            <q-card-section>
              <div class="text-h5 text-center q-pb-md">Total Atividades</div>
              <div class="text-h3 text-center">{{ data?.totalActivities ?? 0 }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-3">
          <q-card class="q-pa-lg">
            <q-card-section>
              <div class="text-h5 text-center q-pb-md">Atividades Completas</div>
              <div class="text-h3 text-center">{{ data?.completedActivities ?? 0 }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-3">
          <q-card class="q-pa-lg">
            <q-card-section>
              <div class="text-h5 text-center q-pb-md">Atividades por Estado Pendente</div>
              <div class="text-h3 text-center">
                {{ filteredActivitiesPending }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-lg q-mb-xl">
        <div class="col-12 col-sm-6">
          <q-card class="q-pa-lg">
            <q-card-section>
              <div class="text-h5 text-center q-pb-md">Total Questionários</div>
              <div class="text-h3 text-center">{{ data?.totalQuestionnaires ?? 0 }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card class="q-pa-lg">
            <q-card-section>
              <div class="text-h5 text-center q-pb-md">Total Participantes</div>
              <div class="text-h3 text-center">{{ data?.totalParticipants ?? 0 }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-xl q-mb-xl">
        <div class="col-12">
          <q-card class="q-pa-lg">
            <q-card-section>
              <div class="text-h5 q-pb-md">Atividades por Estado</div>
              <div
                v-if="!data?.activitiesByStatus?.length"
                class="text-grey text-center q-pa-md text-h6"
              >
                Sem dados de atividades
              </div>
              <div v-else>
                <div
                  v-for="activity in data.activitiesByStatus"
                  :key="activity.state"
                  class="q-mb-md"
                >
                  <div class="row justify-between q-mb-xs">
                    <span class="text-h6" style="color: white">
                      {{ stateLabel[activity.state] ?? activity.state }}
                    </span>
                    <span class="text-h6" style="color: white">{{ activity.count }}</span>
                  </div>
                  <q-linear-progress
                    :color="stateColor[activity.state] ?? 'grey'"
                    :value="data.totalActivities ? activity.count / data.totalActivities : 0"
                    rounded
                    size="12px"
                  />
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-xl q-mb-xl">
        <div class="col-12">
          <q-card class="q-pa-lg">
            <q-card-section>
              <div class="text-h5 text-center q-pb-md">Total Inscrições</div>
              <div class="text-h3 text-center">{{ data?.totalRegistrations ?? 0 }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>
  </q-page>
  <q-dialog v-model="openModal">
    <q-card style="width: 30rem">
      <q-card-section>
        <div class="text-h5">Criar Projeto</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input v-model="newProject.name" label="Nome do Projeto" label-color="white" outlined />

        <q-input v-model="newProject.school" label="Nome da Escola" label-color="white" outlined />

        <q-select
          v-model="newProject.schoolYear"
          :options="schoolYearOptions"
          label="Ano Escolar"
          label-color="white"
          outlined
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="openModal = false" />
        <q-btn :loading="submit" color="positive" label="Criar" @click="submitProject" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useDashboard } from 'src/composables/useDashboard';
import { useProject } from 'src/composables/useProject';
import { useQuasar } from 'quasar';
import { projectService } from 'src/services/projectService';
import { useAuthStore } from 'stores/auth';

const { data: projects, fetchProjects } = useProject();
const { data, loading, fetchDashboard } = useDashboard();
const authStore = useAuthStore();

const selectProject = ref<number | null>(null);
const $q = useQuasar();
const openModal = ref<boolean>(false);
const submit = ref(false);

const stateLabel: Record<string, string> = {
  pending: 'Planeada',
  in_progress: 'Em curso',
  approved: 'Aprovada',
  completed: 'Concluída',
  canceled: 'Cancelada',
};

const stateColor: Record<string, string> = {
  pending: 'orange',
  in_progress: 'blue',
  approved: 'green',
  completed: 'grey',
  canceled: 'red',
};

const newProject = ref({
  name: '',
  school: '',
  schoolYear: '',
  state: true,
});

const schoolYearOptions = computed(() => {
  const month = new Date().getMonth() + 1;
  const year = new Date().getFullYear();
  const current = month >= 9 ? year : year - 1;
  return [`${current}/${current + 1}`, `${current + 1}/${current + 2}`];
});

const filteredActivitiesPending = computed(
  () => data.value?.activitiesByStatus?.find((s) => s.state === 'pending')?.count ?? 0,
);

watch(selectProject, (newId) => {
  if (newId) void fetchDashboard(newId);
});

async function createProject() {
  openModal.value = true;
}

async function submitProject() {
  if (!newProject.value.name || !newProject.value.school || !newProject.value.schoolYear) {
    $q.notify({ type: 'warning', message: 'Preencha os campos obrigatórios' });
    return;
  }
  submit.value = true;
  try {
    await projectService.createProject({ ...newProject.value });
    $q.notify({ type: 'positive', message: 'Projeto criado com sucesso' });
    openModal.value = false;
    newProject.value = {
      name: '',
      school: '',
      schoolYear: '',
      state: true,
    };
    await fetchProjects();
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao criar projeto' });
  } finally {
    submit.value = false;
  }
}

const manageProjects = computed(() =>
  ['admin', 'coordinator'].includes(authStore.user?.profile ?? ''),
);

onMounted(async () => {
  await fetchProjects();
  if (projects.value.length > 0) {
    selectProject.value = projects.value[0]!.id;
  }
});
</script>
