import type { Request, Response } from "express";
import { RegistrationService } from "../services/registrationService/registrationService.js";
import { RegistrationServiceImpl } from "../services/registrationService/impl/registrationServiceImpl.js";
import { logger } from "../utils/logger/logger.js";
import { RegistrationDTO } from "../dto/registrationDTO.js";

export class RegistrationController {
  private readonly registrationService: RegistrationService;

  constructor() {
    this.registrationService = new RegistrationServiceImpl();
  }

  getRegistrationByActivityId = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const activityId = Number(req.params.activityId);

      if (Number.isNaN(activityId) || activityId <= 0) {
        res.status(400).json({ error: "Invalid Activity ID" });
        return;
      }

      const registrations =
        await this.registrationService.findRegistrationByActivityId(activityId);

      if (!registrations) {
        res.status(404).json({ error: "Registrations not found" });
        return;
      }

      const registrationsDTO: RegistrationDTO[] = registrations.map(
        (registration) => ({
          id: registration.id,
          name: registration.name,
          email: registration.email,
        }),
      );

      res.status(200).json(registrationsDTO);
    } catch (error: any) {
      logger.error({ err: error }, "Failed to get all registrations");
      res.status(500).json({ error: error.message });
    }
  };

  createRegistrationByActivityId = async () => {};

  // TODO
  deleteRegistrationByToken = async () => {};

  deleteRegistrationById = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const registrationId = Number(req.params.id);
      if (Number.isNaN(registrationId) || registrationId <= 0) {
        res.status(400).json({ error: "Invalid Registration ID" });
        return;
      }

      await this.registrationService.removeRegistrationByActivityId(
        registrationId,
      );
      logger.info({ registrationId }, "Registration deleted");
      res.status(204).send();
    } catch (error: any) {
      logger.error({ err: error }, "Failed to registration by id.");
      res.status(500).json({ error: error.message });
    }
  };
}
