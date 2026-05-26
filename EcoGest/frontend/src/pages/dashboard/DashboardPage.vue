<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-pb-lg">Dashboard</div>
    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner size="3em" />
    </div>

    <div v-else-if="error" class="text-negative">{{ error }}</div>

    <template v-else>
      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-sm-3">
          <q-card class="q-pa-lg">
            <q-card-section>
              <div class="text-h5 text-center q-pb-md">Atividades planeadas</div>
              <div class="text-h5 text-center">{{ data?.totalActivities ?? 0 }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-3">
          <q-card class="q-pa-lg">
            <q-card-section>Atividades concluídas</q-card-section>
            <div class="text-h5 text-center">{{ data?.completedActivities ?? 0 }}</div>
          </q-card>
        </div>
        <div class="col-12 col-sm-3">
          <q-card class="q-pa-lg">
            <q-card-section>Fotos recolhidas</q-card-section>
            <div class="text-h5 text-center">87</div>
          </q-card>
        </div>
        <div class="col-12 col-sm-3">
          <q-card class="q-pa-lg">
            <q-card-section>Taxa de execução</q-card-section>
            <div class="text-h5 text-center">58%</div>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-md">
        <div class="col-12 col-sm-6">
          <q-card class="q-pa-lg">
            <q-card-section>Volume de atividade mensal</q-card-section>
          </q-card>
        </div>
        <div class="col-12 col-sm-6">
          <q-card class="q-pa-lg">
            <q-card-section>Nível do projeto</q-card-section>
          </q-card>
        </div>
      </div>

      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card class="q-pa-lg">
            <q-card-section>Ranking de membros</q-card-section>
          </q-card>
        </div>
      </div>
    </template>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useDashboard } from 'src/composables/useDashboard';

const { data, loading, error, fetchDashboard } = useDashboard();

onMounted(async () => {
  void fetchDashboard(1);
});
</script>

<style scoped></style>
