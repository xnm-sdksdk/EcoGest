import { PhotoService } from "../photoService.js";
import { CreatePhotoDTO } from "../../../dto/photoDTO.js";
import { Photo } from "../../../entity/photoEntity.js";
import { PhotoRepository } from "../../../repository/photoRepository.js";
import { ExecutionRepository } from "../../../repository/executionRepository.js";
import { MeetingRepository } from "../../../repository/meetingRepository.js";
import { logger } from "../../../utils/logger/logger.js";

export class PhotoServiceImpl implements PhotoService {
  private readonly photoRepository: typeof PhotoRepository;
  private readonly executionRepository: typeof ExecutionRepository;
  private readonly meetingRepository: typeof MeetingRepository;

  constructor() {
    this.photoRepository = PhotoRepository;
    this.executionRepository = ExecutionRepository;
    this.meetingRepository = MeetingRepository;
  }

  async findPhotosByExecution(executionId: number): Promise<Photo[]> {
    const execution = await this.executionRepository.findOneBy({
      id: executionId,
    });

    if (!execution) {
      logger.warn({ executionId }, "Execution not found.");
      throw new Error(`Execution with id ${executionId} not found.`);
    }

    return await this.photoRepository.find({
      where: {
        execution: {
          id: executionId,
        },
      },
      relations: {
        execution: true,
        meeting: true,
      },
    });
  }

  async addPhotosToExecution(
    executionId: number,
    photoDTOs: CreatePhotoDTO[],
  ): Promise<Photo[]> {
    const execution = await this.executionRepository.findOneBy({
      id: executionId,
    });

    if (!execution) {
      logger.warn({ executionId }, "Execution not found.");
      throw new Error(`Execution with id ${executionId} not found.`);
    }

    const photos = photoDTOs.map((photoDTO) =>
      this.photoRepository.create({
        path: photoDTO.path,
        execution,
        meeting: null,
        user: null,
      }),
    );

    return await this.photoRepository.save(photos);
  }

  async removeExecutionPhoto(photoId: number): Promise<void> {
    await this.photoRepository.delete(photoId);
  }

  async findPhotosByMeeting(meetingId: number): Promise<Photo[]> {
    const meeting = await this.meetingRepository.findOneBy({
      id: meetingId,
    });

    if (!meeting) {
      logger.warn({ meetingId }, "Meeting not found.");
      throw new Error(`Meeting with id ${meetingId} not found.`);
    }

    return await this.photoRepository.find({
      where: {
        meeting: {
          id: meetingId,
        },
      },
      relations: {
        execution: true,
        meeting: true,
      },
    });
  }

  async addPhotosToMeeting(
    meetingId: number,
    photoDTOs: CreatePhotoDTO[],
  ): Promise<Photo[]> {
    const meeting = await this.meetingRepository.findOneBy({
      id: meetingId,
    });

    if (!meeting) {
      logger.warn({ meetingId }, "Meeting not found.");
      throw new Error(`Meeting with id ${meetingId} not found.`);
    }

    const photos = photoDTOs.map((photoDTO) =>
      this.photoRepository.create({
        path: photoDTO.path,
        meeting,
        execution: null,
        user: null,
      }),
    );

    return await this.photoRepository.save(photos);
  }

  async removeMeetingPhoto(photoId: number): Promise<void> {
    await this.photoRepository.delete(photoId);
  }
}