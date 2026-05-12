import { RegistrationService } from "../registrationService.js";
import { Registration } from "../../../entity/registrationEntity.js";

export class RegistrationServiceImpl implements RegistrationService {
  createRegistrationByActivityId(): Promise<Registration> {
    return Promise.resolve(undefined);
  }

  findRegistrationByActivityId(activityId: number): Promise<Registration[]> {
    return Promise.resolve([]);
  }

  removeRegistrationByActivityId(registrationId: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  removeRegistrationByToken(tokenId: number): Promise<void> {
    return Promise.resolve(undefined);
  }
}
