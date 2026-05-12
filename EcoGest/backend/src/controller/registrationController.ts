import { RegistrationService } from "../services/registrationService/registrationService.js";
import { RegistrationServiceImpl } from "../services/registrationService/impl/registrationServiceImpl.js";

export class RegistrationController {
  private readonly registrationService: RegistrationService;
  constructor() {
    this.registrationService = new RegistrationServiceImpl();
  }

  getRegistrationByActivityId = async () => {};

  createRegistrationByActivityId = async () => {};

  deleteRegistrationByToken = async () => {};

  deleteRegistrationById = async () => {};
}
