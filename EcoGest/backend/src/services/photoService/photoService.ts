import { Photo } from "../../entity/photoEntity.js";
import { CreatePhotoDTO } from "../../dto/photoDTO.js";

export interface PhotoService {
  findPhotosByExecution(executionId: number): Promise<Photo[]>;

  addPhotosToExecution(
    executionId: number,
    photoDTOs: CreatePhotoDTO[],
  ): Promise<Photo[]>;

  removeExecutionPhoto(photoId: number): Promise<void>;

  findPhotosByMeeting(meetingId: number): Promise<Photo[]>;

  addPhotosToMeeting(
    meetingId: number,
    photoDTOs: CreatePhotoDTO[],
  ): Promise<Photo[]>;

  removeMeetingPhoto(photoId: number): Promise<void>;
}