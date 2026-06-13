<template>
  <q-page class="q-pa-md">
    <div class="row justify-between items-center q-pt-lg q-pb-xl q-pr-lg">
      <div class="text-h4">Plano de Atividades</div>
      <q-btn color="positive" unelevated @click="createActivity()">
        <q-icon left name="add" />
        Nova Atividade
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
        <q-select
          v-model="selectedArea"
          :options="areaOptions"
          clearable
          dense
          emit-value
          label="Todas as áreas"
          label-color="white"
          outlined
          style="min-width: 180px"
        />
        <q-select
          v-model="selectedState"
          :options="stateOptions"
          clearable
          dense
          emit-value
          label="Todos os estados"
          label-color="white"
          map-options
          option-label="label"
          option-value="value"
          outlined
          style="min-width: 180px"
        />
      </div>

      <q-table
        :columns="columns"
        :rows="filteredActivities"
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
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              class="q-ml-xs"
              color="white"
              dense
              flat
              icon="edit"
              @click="editActivity(props.row.id)"
              ><q-tooltip>{{ 'Editar Atividade' }} </q-tooltip></q-btn
            >
            <q-btn
              :disable="!manageActivities"
              class="q-mx-md"
              color="white"
              dense
              flat
              icon="delete"
              @click="confirmDelete(props.row.id)"
              ><q-tooltip>{{ 'Apagar Atividade' }} </q-tooltip></q-btn
            >
            <q-btn
              class="q-mr-md"
              color="white"
              dense
              flat
              icon="person_add"
              @click="registerActivity(props.row.id)"
              ><q-tooltip>{{ 'Inscrever na Atividade' }} </q-tooltip></q-btn
            >
            <q-btn
              :disable="
                props.row.state === 'completed' ||
                (props.row.state === 'canceled' && !manageActivities)
              "
              color="white"
              dense
              flat
              icon="check_circle"
              @click="changeActivityState(props.row)"
              ><q-tooltip>
                {{
                  props.row.state === 'pending'
                    ? 'Aprovar atividade'
                    : props.row.state === 'approved'
                      ? 'Concluir atividade'
                      : 'Atividade concluída'
                }}
              </q-tooltip></q-btn
            >
          </q-td>
        </template>
      </q-table>
    </template>
  </q-page>
  <q-dialog v-model="openModal">
    <q-card style="width: 30rem">
      <q-card-section>
        <div class="text-h5">{{ isEditing ? 'Editar Atividade' : 'Criar Atividade' }}</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input
          v-model="newActivity.name"
          label="Nome da Atividade"
          label-color="white"
          outlined
        />
        <q-input
          v-model="newActivity.description"
          label="Descrição"
          label-color="white"
          outlined
          type="textarea"
        />
        <q-select
          v-model="newActivity.area"
          :options="areaOptions"
          label="Área"
          label-color="white"
          outlined
        />
        <q-select
          v-model="newActivity.resources"
          hint="Escreva e prima Enter para adicionar o recurso"
          label="Recursos"
          label-color="white"
          multiple
          new-value-mode="add-unique"
          outlined
          style="height: 80px; color: white"
          use-chips
          use-input
        />
        <q-input
          v-model="newActivity.startDate"
          label="Data de Início"
          label-color="white"
          mask="####-##-##"
          outlined
          placeholder="AAAAA-MM-DD"
        />
        <q-input
          v-model="newActivity.endDate"
          label="Data de Fim"
          label-color="white"
          mask="####-##-##"
          outlined
          placeholder="AAAA-MM-DD"
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="openModal = false" />
        <q-btn
          :label="isEditing ? 'Guardar' : 'Criar'"
          :loading="submit"
          color="positive"
          @click="submitActivity"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <q-dialog v-model="deleteModal">
    <q-card style="width: 30rem">
      <q-card-section>
        <div class="text-h5">Apagar Atividade</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <div class="text-h6">Tem a certeza que quer apagar a atividade?</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="openModal = false" />
        <q-btn :loading="submit" color="positive" label="Apagar" @click="deleteActivity()" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog v-model="participantsModal">
    <q-card style="width: 30rem">
      <q-card-section>
        <div class="text-h5">Participantes</div>
      </q-card-section>

      <q-card-section>
        <div v-if="participants.length === 0" class="text-grey">Sem participantes inscritos.</div>
        <q-chip
          v-for="p in participants"
          :key="p.id"
          color="primary"
          removable
          text-color="white"
          @remove="removeParticipant(p.id)"
        >
          {{ p.name }}
        </q-chip>
      </q-card-section>

      <q-card-section>
        <q-select
          v-model="selectedUserId"
          :options="availableUsers"
          emit-value
          label="Adicionar participante"
          label-color="white"
          map-options
          option-label="name"
          option-value="id"
          outlined
        />
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Fechar" @click="participantsModal = false" />
        <q-btn color="positive" label="Inscrever" @click="addParticipant" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref, watch} from 'vue';
import {useActivity} from 'src/composables/useActivity';
import {useProject} from 'src/composables/useProject';
import {useQuasar} from 'quasar';
import {activityService} from 'src/services/activityService';
import {Activity} from 'src/types/dtos/activityDTO';
import {User} from 'src/types/dtos/userDTO';
import {useUser} from 'src/composables/useUser';
import {activityParticipantsService} from 'src/services/activityParticipantsService';
import {useAuthStore} from 'stores/auth';

const { data: activities, loading, fetchActivitiesByProjectId } = useActivity();
const { data: projects, fetchProjects } = useProject();
const { users: allUsers, fetchUsers } = useUser();
const authStore = useAuthStore();
const $q = useQuasar();

const selectProject = ref<number | null>(null);
const selectedArea = ref<string | null>(null);
const selectedState = ref<string | null>(null);
const activityToDelete = ref<number | null>(null);
const openModal = ref<boolean>(false);
const deleteModal = ref<boolean>(false);
const submit = ref(false);
const isEditing = ref(false);
const participantsModal = ref(false);
const selectedActivityId = ref<number | null>(null);
const participants = ref<User[]>([]);
const selectedUserId = ref<number | null>(null);

const newActivity = ref({
  id: 0,
  name: '',
  description: '',
  area: '',
  resources: [] as string[],
  startDate: '',
  endDate: '',
});

const areaOptions = ['Resíduos', 'Energia', 'Biodiversidade', 'Água'];
const stateOptions = [
  { label: 'Planeada', value: 'pending' },
  { label: 'Em curso', value: 'in_progress' },
  { label: 'Concluída', value: 'completed' },
];

const columns = [
  { name: 'name', label: 'Nome', field: 'name', align: 'left' as const, sortable: true },
  { name: 'area', label: 'Área', field: 'area', align: 'left' as const },
  {
    name: 'resources',
    label: 'Recursos',
    field: (row: { resources: string[] }) =>
      Array.isArray(row.resources) ? row.resources.join(', ') : row.resources,
    align: 'left' as const,
  },
  { name: 'state', label: 'Estado', field: 'state', align: 'left' as const },
  { name: 'startDate', label: 'Data início', field: 'startDate', align: 'left' as const },
  { name: 'endDate', label: 'Data fim', field: 'endDate', align: 'left' as const },
  {
    name: 'participantsCount',
    label: 'Participantes',
    field: 'participantsCount',
    align: 'center' as const,
  },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' as const, sortable: false },
];

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

const filteredActivities = computed(() => {
  return (activities.value ?? []).filter((a) => {
    const areaMatch = !selectedArea.value || a.area === selectedArea.value;
    const stateMatch = !selectedState.value || a.state === selectedState.value;
    return areaMatch && stateMatch;
  });
});

watch(selectProject, (newId) => {
  if (newId) void fetchActivitiesByProjectId(newId);
});

async function createActivity() {
  isEditing.value = false;
  newActivity.value = {
    id: 0,
    name: '',
    description: '',
    area: '',
    resources: [],
    startDate: '',
    endDate: '',
  };
  openModal.value = true;
}

async function submitActivity() {
  if (!newActivity.value.name || !newActivity.value.area) {
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
    if (isEditing.value) {
      await activityService.updateActivity(newActivity.value.id, {
        name: newActivity.value.name,
        description: newActivity.value.description,
        area: newActivity.value.area,
        resources: newActivity.value.resources,
        startDate: newActivity.value.startDate,
        endDate: newActivity.value.endDate,
      });
      $q.notify({ type: 'positive', message: 'Atividade atualizada com sucesso' });
    } else {
      await activityService.createActivity(projectId, { ...newActivity.value, projectId });
      $q.notify({ type: 'positive', message: 'Atividade criada com sucesso' });
    }
    openModal.value = false;
    void fetchActivitiesByProjectId(projectId);
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao guardar atividade' });
  } finally {
    submit.value = false;
  }
}

async function confirmDelete(activityId: number) {
  activityToDelete.value = activityId;
  deleteModal.value = true;
}

async function deleteActivity() {
  if (!activityToDelete.value) return;
  try {
    await activityService.deleteActivityById(activityToDelete.value);
    $q.notify({ type: 'positive', message: 'Atividade eliminada com sucesso' });
    if (selectProject.value) void fetchActivitiesByProjectId(selectProject.value);
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao eliminar atividade' });
  } finally {
    deleteModal.value = false;
    activityToDelete.value = null;
  }
}

async function changeActivityState(activity: Activity) {
  try {
    if (activity.state === 'pending') {
      await activityService.approveActivityState(activity.id);
    } else if (activity.state === 'approved') {
      await activityService.completeActivityState(activity.id);
    } else {
      return;
    }
    $q.notify({ type: 'positive', message: 'Estado atualizado' });
    if (selectProject.value) void fetchActivitiesByProjectId(selectProject.value);
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao atualizar estado' });
  }
}

async function editActivity(activityId: number) {
  const activity = activities.value.find((a) => a.id === activityId);
  if (!activity) return;
  isEditing.value = true;

  newActivity.value = {
    id: activity.id,
    name: activity.name,
    description: activity.description,
    area: activity.area,
    resources: Array.isArray(activity.resources) ? [...activity.resources] : [],
    startDate: activity.startDate,
    endDate: activity.endDate,
  };
  openModal.value = true;
}

async function registerActivity(activityId: number) {
  selectedActivityId.value = activityId;
  participants.value = await activityParticipantsService.getActivityParticipants(activityId);
  await fetchUsers();
  participantsModal.value = true;
}

async function addParticipant() {
  if (!selectedUserId.value || !selectedActivityId.value) return;
  try {
    await activityParticipantsService.addActivityParticipant(
      selectedActivityId.value,
      selectedUserId.value,
    );
    participants.value = await activityParticipantsService.getActivityParticipants(
      selectedActivityId.value,
    );
    selectedUserId.value = null;
    $q.notify({ type: 'positive', message: 'Participante inscrito com sucesso' });
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao inscrever participante' });
  }
}

async function removeParticipant(userId: number) {
  if (!selectedActivityId.value) return;
  try {
    await activityParticipantsService.removeActivityParticipant(selectedActivityId.value, userId);
    participants.value = await activityParticipantsService.getActivityParticipants(
      selectedActivityId.value,
    );
    $q.notify({ type: 'positive', message: 'Participante removido com sucesso' });
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao remover participante' });
  }
}

const manageActivities = computed(() =>
  ['admin', 'coordinator'].includes(authStore.user?.profile ?? ''),
);

const availableUsers = computed(() =>
  allUsers.value.filter((u) => !participants.value.some((p) => p.id === u.id)),
);

onMounted(async () => {
  await fetchProjects();
  if (projects?.value?.length > 0) {
    selectProject.value = projects?.value[0]!.id;
  }
});
</script>
