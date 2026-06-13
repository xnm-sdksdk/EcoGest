import { ref } from 'vue';
import { executionService } from 'src/services/executionService';
import { CreateExecutionDTO, ExecutionDTO, UpdateExecutionDTO } from 'src/types/dtos/executionDTO';

export function useExecution() {
  const execution = ref<ExecutionDTO | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchExecution(activityId: number) {
    loading.value = true;
    error.value = null;
    try {
      execution.value = await executionService.getExecutionByActivityId(activityId);
    } catch {
      execution.value = null;
    } finally {
      loading.value = false;
    }
  }

  async function createExecution(activityId: number, data: CreateExecutionDTO) {
    loading.value = true;
    error.value = null;
    try {
      execution.value = await executionService.createExecution(activityId, data);
    } catch (e) {
      error.value = 'Erro ao criar execução';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function updateExecution(executionId: number, data: UpdateExecutionDTO) {
    loading.value = true;
    error.value = null;
    try {
      execution.value = await executionService.updateExecution(executionId, data);
    } catch (e) {
      error.value = 'Erro ao atualizar execução';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  return { execution, loading, error, fetchExecution, createExecution, updateExecution };
}
