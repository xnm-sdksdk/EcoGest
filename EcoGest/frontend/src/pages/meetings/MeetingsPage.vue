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
      ></q-table>
    </template>

    <q-dialog v-model="openModal"></q-dialog>
  </q-page>
</template>

<script lang="ts" setup>
import { useMeeting } from 'src/composables/useMeeting';
import { onMounted, ref, watch } from 'vue';
import { useProject } from 'src/composables/useProject';
import { useQuasar } from 'quasar';

const selectProject = ref<number | null>(null);

const openModal = ref<boolean>(false);
const submit = ref(false);

const { data: meetings, loading, fetchMeetingById } = useMeeting();
const { data: projects, fetchProjects } = useProject();
const $q = useQuasar();

const columns = [
  { name: 'name', label: 'Nome', field: 'name', align: 'left' as const, sortable: true },
];

const filteredMeetings = [{}];

async function createMeeting() {
  openModal.value = true;
}

async function submitMeeting() {
  const projectId = selectProject.value;

  if (!projectId) {
    $q.notify({ type: 'warning', message: 'Seleciona um projeto' });
    return;
  }
}

watch(selectProject, (newId) => {
  if (newId) void fetchMeetingById(newId);
});

onMounted(async () => {
  await fetchProjects();
  if (projects?.value?.length > 0) {
    selectProject.value = projects?.value[0]!.id;
  }
});
</script>

<style scoped></style>
