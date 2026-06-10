<template>
  <q-page class="q-pa-md">
    <div class="row justify-between items-center q-pt-lg q-pb-xl q-pr-lg">
      <div class="text-h4">Reuniões</div>
      <q-btn color="positive" unelevated @click="createMeeting()">
        <q-icon left name="add" />
        Nova Reunião
      </q-btn>
    </div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner size="3em" />
    </div>

    <template v-else>
      <div class="row q-gutter-md q-mb-lg">
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

      <q-table
        :columns="columns"
        :rows="filteredMeetings"
        :rows-per-page-options="[10, 20, 50]"
        bordered
        flat
        row-key="id"
      >
        <template #body-cell-state="props">
          <q-td :props="props">
            <q-badge
              :color="stateColor[props.value] ?? 'grey'"
              :label="stateLabel[props.value] ?? props.value"
              class="q-pa-xs"
            />
          </q-td>
        </template>
      </q-table>
    </template>

    <q-dialog v-model="openModal">
      <q-card style="width: 30rem">
        <q-card-section>
          <div class="text-h5">Criar Reunião</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input
            v-model="newMeeting.title"
            label="Título da Reunião"
            label-color="white"
            outlined
          />
          <q-input
            v-model="newMeeting.description"
            label="Descrição"
            label-color="white"
            outlined
            type="textarea"
          />

          <q-input
            v-model="newMeeting.location"
            label="Localização da Reunião"
            label-color="white"
            outlined
          />

          <q-input v-model="displayDate" label="Data e Hora" label-color="white" outlined readonly>
            <template #append>
              <q-icon class="cursor-pointer" color="white" name="event">
                <q-popup-proxy cover transition-hide="scale" transition-show="scale">
                  <q-date v-model="datepart" mask="YYYY-MM-DD">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="white" flat label="Fechar" />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
              <q-icon class="cursor-pointer" color="white" name="access_time">
                <q-popup-proxy cover transition-hide="scale" transition-show="scale">
                  <q-time v-model="timepart" mask="HH:mm">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup color="white" flat label="Fechar" />
                    </div>
                  </q-time>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>

          <q-input
            v-model="newMeeting.agenda"
            label="Agenda"
            label-color="white"
            outlined
            type="textarea"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="openModal = false" />
          <q-btn :loading="submit" color="positive" label="Criar" @click="submitMeeting" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeeting } from 'src/composables/useMeeting';
import { computed, onMounted, ref, watch } from 'vue';
import { useProject } from 'src/composables/useProject';
import { useQuasar } from 'quasar';
import { meetingService } from 'src/services/meetingService';

const selectProject = ref<number | null>(null);

const openModal = ref<boolean>(false);
const submit = ref(false);

const { data: meetings, loading, fetchMeetingByProjectId } = useMeeting();
const { data: projects, fetchProjects } = useProject();
const $q = useQuasar();
const datepart = ref('');
const timepart = ref('');

const displayDate = computed(() => {
  if (datepart.value && timepart.value) return `${datepart.value} ${timepart.value}`;
  if (datepart.value) return datepart.value;
  return '';
});

const newMeeting = ref({
  title: '',
  description: '',
  date: '',
  location: '',
  agenda: '',
  projectId: 0,
});

const stateLabel: Record<string, string> = {
  scheduled: 'Agendada',
  ongoing: 'A decorrer',
  completed: 'Concluída',
  canceled: 'Cancelada',
};

const stateColor: Record<string, string> = {
  scheduled: 'orange',
  ongoing: 'blue',
  completed: 'green',
  canceled: 'red',
};

const columns = [
  { name: 'title', label: 'Título', field: 'title', align: 'left' as const, sortable: true },
  { name: 'date', label: 'Data', field: 'date', align: 'left' as const, sortable: true },
  { name: 'location', label: 'Local', field: 'location', align: 'left' as const, sortable: false },
  { name: 'state', label: 'Estado', field: 'state', align: 'center' as const, sortable: true },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' as const, sortable: false },
];

const filteredMeetings = computed(() => {
  return meetings.value ?? [];
});

async function createMeeting() {
  openModal.value = true;
}

async function submitMeeting() {
  if (!newMeeting.value.title || !newMeeting.value.date) {
    $q.notify({ type: 'warning', message: 'Preencha os campos obrigatórios' });
    return;
  }

  const projectId = selectProject.value;

  if (!projectId) {
    $q.notify({ type: 'warning', message: 'Seleciona um projeto' });
    return;
  }

  submit.value = true;

  try {
    await meetingService.createMeeting(projectId, { ...newMeeting.value, projectId });
    $q.notify({ type: 'positive', message: 'Reunião criada com sucesso' });
    openModal.value = false;
    newMeeting.value = {
      title: '',
      description: '',
      date: '',
      location: '',
      agenda: '',
      projectId: projectId,
    };
    void fetchMeetingByProjectId(projectId);
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao criar reunião' });
  } finally {
    submit.value = false;
  }
}

watch(selectProject, (newId) => {
  if (newId) void fetchMeetingByProjectId(newId);
});

watch([datepart, timepart], ([d, t]) => {
  if (d && t) newMeeting.value.date = `${d}T${t}`;
  else if (d) newMeeting.value.date = `${d}T00:00`;
});

onMounted(async () => {
  await fetchProjects();
  if (projects?.value?.length > 0) {
    selectProject.value = projects?.value[0]!.id;
  }
});
</script>

<style scoped></style>
