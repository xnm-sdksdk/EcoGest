<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-pt-lg q-pb-xl">Dashboard</div>
    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner size="3em" />
    </div>
    <template v-else>
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
              <div class="text-h5 text-center q-pb-md">Atividades por Estado</div>
              <div class="text-h3 text-center">
                {{ activitiesByState }}
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

      <div class="row q-col-gutter-xl">
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
</template>

<script lang="ts" setup>
import {computed, onMounted} from 'vue';
import {useDashboard} from 'src/composables/useDashboard';

const { data, loading, fetchDashboard } = useDashboard();
const activitiesByState = computed(() =>
  (data.value?.activitiesByStatus ?? []).reduce((sum, i) => sum + i.count, 0),
);

// const route = useRoute();

onMounted(async () => {
  // TODO const projectId = Number(route.params.projectId);
  void fetchDashboard(1);
});
</script>

<style scoped></style>
