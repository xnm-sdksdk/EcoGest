import { Registration } from "../../entity/registrationEntity.js";

export interface RegistrationService {
  createRegistrationByActivityId(): Promise<Registration>;

  removeRegistrationByActivityId(registrationId: number): Promise<void>;

  removeRegistrationByToken(tokenId: number): Promise<void>;

  findRegistrationByActivityId(activityId: number): Promise<Registration[]>;
}
