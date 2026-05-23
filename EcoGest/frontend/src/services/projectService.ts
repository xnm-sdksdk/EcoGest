import { CreateProject, Project, UpdateProject } from 'src/types/dtos/projectDTO';
import { api } from 'boot/axios';

export const projectService = {
  getProjectById(id: number): Promise<Project> {
    return api.get<Project>(`/projects/${id}`).then((r) => r.data);
  },

  getAllProjects(): Promise<Project[]> {
    return api.get<Project[]>(`/projects`).then((r) => r.data);
  },

  createProject(createProject: CreateProject): Promise<Project> {
    return api.post<Project>(`/projects`, createProject).then((r) => r.data);
  },

  updateProjectById(id: number, updateProject: UpdateProject): Promise<Project> {
    return api.put<Project>(`/projects/${id}`, updateProject).then((r) => r.data);
  },

  deleteProjectById(id: number): Promise<void> {
    return api.delete(`/projects/${id}`).then(() => undefined);
  },
};
