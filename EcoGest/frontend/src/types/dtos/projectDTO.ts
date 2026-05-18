export interface Project {
  id: number;
  name: string;
  school: string;
  schoolYear: string;
  state: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProject {
  name: string;
  school: string;
  schoolYear: string;
  state?: boolean;
}

export interface UpdateProject {
  name?: string;
  school?: string;
  schoolYear?: string;
  state?: boolean;
}
