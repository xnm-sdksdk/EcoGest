<template>
  <q-page class="q-pa-md">
    <div class="row justify-between items-center q-pt-lg q-pb-xl q-pr-lg">
      <div class="text-h4">Gamificação</div>
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
      <div class="q-pb-md">
        <q-table
          :columns="scoringColumns"
          :rows="filteredScoring"
          bordered
          class="text-white"
          flat
          hide-bottom
          no-data-label="Sem pontuação para mostrar"
          row-key="name"
          title="Pontuação"
        />
      </div>
      <div class="q-pb-md">
        <q-table
          :columns="rankingColumns"
          :rows="filteredRanking"
          bordered
          class="text-white"
          flat
          hide-bottom
          no-data-label="Sem ranking para mostrar"
          row-key="name"
          title="Ranking"
        >
          <template #body-cell-position="props">
            <q-td :props="props">
              {{ props.rowIndex + 1 }}
            </q-td>
          </template>
        </q-table>
      </div>
    </template>
  </q-page>
</template>

<script lang="ts" setup>
import { useGamification } from 'src/composables/useGamification';
import { computed, onMounted, ref, watch } from 'vue';
import { useProject } from 'src/composables/useProject';
import { ScoringDTO } from 'src/types/dtos/gamificationDTO';

const { scoring, ranking, loading, fetchRankingByProjectId, fetchScoringByProjectId } =
  useGamification();
const { data: projects, fetchProjects } = useProject();
const selectProject = ref<number | null>(null);

const scoringColumns = [
  {
    name: 'createdAt',
    label: 'Data',
    field: (row: ScoringDTO) => new Date(row.createdAt).toLocaleDateString('pt-Pt'),
    align: 'left' as const,
    sortable: true,
  },
  { name: 'userName', label: 'Utilizador', field: 'userName', align: 'left' as const },
  { name: 'points', label: 'Pontos', field: 'points', align: 'center' as const, sortable: true },
  { name: 'reason', label: 'Razão', field: 'reason', align: 'left' as const },
];

const rankingColumns = [
  { name: 'position', label: 'Posição', field: 'userId', align: 'center' as const },
  { name: 'userName', label: 'Utilizador', field: 'userName', align: 'left' as const },
  {
    name: 'totalPoints',
    label: 'Pontos Totais',
    field: 'totalPoints',
    align: 'center' as const,
    sortable: true,
  },
];

const filteredScoring = computed(() => {
  return scoring.value ?? [];
});

const filteredRanking = computed(() => {
  return ranking.value ?? [];
});

watch(selectProject, (newProjectId) => {
  if (newProjectId) {
    void fetchScoringByProjectId(newProjectId);
    void fetchRankingByProjectId(newProjectId);
  }
});

onMounted(async () => {
  await fetchProjects();
  if (projects.value?.length > 0) {
    selectProject.value = projects.value[0]!.id;
  }
});
</script>
