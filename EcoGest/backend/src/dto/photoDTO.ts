export interface PhotoDTO {
  id?: number;
  path: string;
  executionId?: number | undefined;
  meetingId?: number | undefined;
}

export interface CreatePhotoDTO {
  path: string;
}