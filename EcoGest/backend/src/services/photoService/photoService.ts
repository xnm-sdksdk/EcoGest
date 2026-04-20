import { Photo } from "../../entity/photoEntity.js";
import { PhotoDTO } from "../../dto/photoDTO.js";

export interface PhotoService {
  findPhotosByExecution(executionId: number): Promise<Photo[]>;
  addPhotosToExecution(
    executionId: number,
    photoDTOs: PhotoDTO[],
  ): Promise<Photo[]>;

  removeExecutionPhoto(photoId: number): Promise<void | null>;

  findPhotosByMeeting(meetingId: number): Promise<Photo[]>;

  addPhotosToMeeting(
    meetingId: number,
    photoDTOs: PhotoDTO[],
  ): Promise<Photo[]>;

  removeMeetingPhoto(photoId: number): Promise<void | null>;
}
