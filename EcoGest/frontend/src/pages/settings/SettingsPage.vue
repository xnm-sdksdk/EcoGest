<template>
  <q-page class="q-pa-md">
    <div class="row justify-between items-center q-pt-lg q-pb-xl q-pr-lg">
      <div class="text-h4">Definições</div>
    </div>

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner size="3em" />
    </div>

    <template v-else>
      <q-table
        :columns="columns"
        :rows="users"
        :rows-per-page-options="[10, 20, 50]"
        bordered
        flat
        row-key="id"
      >
        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn color="white" dense flat icon="delete" @click="confirmDelete(props.row.id)">
              <q-tooltip>Apagar Utilizador</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </template>
  </q-page>
  <q-dialog v-model="deleteModal">
    <q-card style="width: 30rem">
      <q-card-section>
        <div class="text-h5">Apagar Utilizador</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <div class="text-h6">Tem a certeza que quer apagar o utilizador?</div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="openModal = false" />
        <q-btn :loading="submit" color="positive" label="Apagar" @click="deleteUserHandle()" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { useUser } from 'src/composables/useUser';
import { onMounted, ref } from 'vue';
import { useQuasar } from 'quasar';

const deleteModal = ref<boolean>(false);
const userToDelete = ref<number | null>(null);
const openModal = ref<boolean>(false);
const submit = ref(false);
const $q = useQuasar();

const columns = [
  { name: 'name', label: 'Nome', field: 'name', align: 'left' as const, sortable: true },
  { name: 'email', label: 'Email', field: 'email', align: 'left' as const, sortable: true },
  { name: 'role', label: 'Perfil', field: 'role', align: 'left' as const },
  { name: 'actions', label: 'Ações', field: 'actions', align: 'center' as const, sortable: false },
];

const { deleteUser, fetchUsers, loading, users } = useUser();

async function confirmDelete(userId: number) {
  userToDelete.value = userId;
  deleteModal.value = true;
}

async function deleteUserHandle() {
  if (!userToDelete.value) return;

  try {
    await deleteUser(userToDelete.value);
    $q.notify({ type: 'positive', message: 'Utilizador eliminado com sucesso' });
  } catch {
    $q.notify({ type: 'negative', message: 'Erro ao eliminar utilizador' });
  } finally {
    deleteModal.value = false;
    userToDelete.value = null;
  }
}

onMounted(async () => {
  await fetchUsers();
});
</script>
