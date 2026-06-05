<template>
  <q-page class="q-pa-md">
    <div class="row justify-between items-center q-pt-lg q-pb-xl q-pr-lg">
      <div class="text-h4">Plano de Atividades</div>
      <q-btn color="positive" unelevated>
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
          :options="allProjects"
          clearable
          dense
          emit-value
          label="Selecionar projeto"
          label-color="white"
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
      </q-table>
    </template>
  </q-page>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useActivity } from 'src/composables/useActivity';

// TODO const route = useRoute();
const { data, loading, fetchActivitiesByProjectId } = useActivity();

const selectProject = ref<Map<number, string>>(null);
const selectedArea = ref<string | null>(null);
const selectedState = ref<string | null>(null);

const allProjects = [1, 'Esmad Project'];

const areaOptions = ['Resíduos', 'Energia', 'Biodiversidade', 'Água'];
const stateOptions = [
  { label: 'Planeada', value: 'pending' },
  { label: 'Em curso', value: 'in_progress' },
  { label: 'Concluída', value: 'completed' },
];

const columns = [
  { name: 'name', label: 'Nome', field: 'name', align: 'left' as const, sortable: true },
  { name: 'area', label: 'Área', field: 'area', align: 'left' as const },
  { name: 'resources', label: 'Recursos', field: 'resources', align: 'left' as const },
  { name: 'state', label: 'Estado', field: 'state', align: 'left' as const },
  { name: 'startDate', label: 'Data início', field: 'startDate', align: 'left' as const },
  { name: 'endDate', label: 'Data fim', field: 'endDate', align: 'left' as const },
];

const stateLabel: Record<string, string> = {
  pending: 'Planeada',
  in_progress: 'Em curso',
  completed: 'Concluída',
};

const stateColor: Record<string, string> = {
  pending: 'blue',
  in_progress: 'teal',
  completed: 'grey',
};

const filteredActivities = computed(() => {
  return (data.value ?? []).filter((a) => {
    const areaMatch = !selectedArea.value || a.area === selectedArea.value;
    const stateMatch = !selectedState.value || a.state === selectedState.value;
    return areaMatch && stateMatch;
  });
});

onMounted(() => {
  //TODO const projectId = Number(route.params.projectId);
  void fetchActivitiesByProjectId(1);
});
</script>

<style scoped></style>
