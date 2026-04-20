import { PhotoService } from "../photoService.js";
import { PhotoDTO } from "../../../dto/photoDTO.js";
import { Photo } from "../../../entity/photoEntity.js";
import { PhotoRepository } from "../../../repository/photoRepository.js";

export class PhotoServiceImpl implements PhotoService {
  private photoRepository: typeof PhotoRepository;

  constructor() {
    this.photoRepository = PhotoRepository;
  }

  addPhotosToExecution(
    executionId: number,
    photoDTOs: PhotoDTO[],
  ): Promise<Photo[]> {
    return Promise.resolve([]);
  }

  addPhotosToMeeting(
    meetingId: number,
    photoDTOs: PhotoDTO[],
  ): Promise<Photo[]> {
    return Promise.resolve([]);
  }

  findPhotosByExecution(executionId: number): Promise<Photo[]> {
    return Promise.resolve([]);
  }

  findPhotosByMeeting(meetingId: number): Promise<Photo[]> {
    return Promise.resolve([]);
  }

  removeExecutionPhoto(photoId: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  removeMeetingPhoto(photoId: number): Promise<void> {
    return Promise.resolve(undefined);
  }
}
