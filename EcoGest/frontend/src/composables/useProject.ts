import { ref } from 'vue';
import { Project } from 'src/types/dtos/projectDTO';
import { projectService } from 'src/services/projectService';

export function useProject() {
  const data = ref<Project[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchProjects() {
    loading.value = true;
    error.value = null;
    try {
      data.value = await projectService.getAllProjects();
    } catch (e) {
      error.value = 'Erro ao carregar projetos';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  async function fetchProjectById(id: number) {
    loading.value = true;
    error.value = null;
    try {
      const project = await projectService.getProjectById(id);
      data.value = [project];
    } catch (e) {
      error.value = 'Erro ao carregar projeto';
      console.error(e);
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, fetchProjects, fetchProjectById };
}
