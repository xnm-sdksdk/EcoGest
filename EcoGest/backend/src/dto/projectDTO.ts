export interface ProjectDTO {
  id: number;
  name: string;
  school: string;
  schoolYear: string;
  state?: boolean;
}

export interface CreateProjectDTO {
  name: string;
  school: string;
  schoolYear: string;
  state?: boolean;
}

export interface UpdateProjectDTO {
  name?: string;
  school?: string;
  schoolYear?: string;
  state?: boolean;
}
