<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-pt-lg q-pb-xl">Plano Atividades</div>
    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner size="3em" />
    </div>
    <template v-else>

    </template>
  </q-page>
</template>

<script lang="ts" setup></script>

<style scoped></style>
