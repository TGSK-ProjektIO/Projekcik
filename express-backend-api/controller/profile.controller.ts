import {inject, injectable} from "inversify";
import {TYPES} from "../config/types.config";
import {ProfileService} from "../services/profile.service";


@injectable()
export class ProfileController {
  constructor(@inject(TYPES.ProfileService) private profileService: ProfileService) {
  }

  // ---------- PUT REQUESTS ----------

  public createProfile() {
    return async (request: any, response: any) => {
      let profile = request.body;
      try {
        const createdProfile = await this.profileService.createProfile(profile);
        response.status(201).send({
          message: "created",
          id: createdProfile._id
        });
      } catch (error) {
        response.status(400).send({
          message: "Invalid params"
        });
      }
    }
  }

  // ---------- POST REQUESTS ----------

  public changeNickname() {
    return async (request: any, response: any) => {
      let userId = request.body?.userId;
      if (!userId) {
        return response.status(400).send({
          error: "Missing required 'userId' parameter"
        });
      }
      let nickname = request.body?.nickname;
      if (!nickname) {
        return response.status(400).send({
          error: "Missing required 'nickname' parameter"
        });
      }
      try {
        const duplicate = await this.profileService.getProfileByNickname(nickname);
        if (!duplicate) {
          await this.profileService.updateNickname(userId, nickname);
          response.status(201).send({
            message: "Profile picture changed",
          });
        } else {
          response.status(400).send({
            message: "This nickname is taken"
          });
        }
      } catch (error) {
        response.status(400).send({
          message: "Error occurred while changing profile picture"
        });
      }
    }
  }

  public changeProfilePicture() {
    return async (request: any, response: any) => {
      let userId = request.body?.userId;
      if (!userId) {
        return response.status(400).send({
          error: "Missing required 'userId' parameter"
        });
      }
      let profilePicture = request.body?.profilePicture;
      if (!profilePicture) {
        return response.status(400).send({
          error: "Missing required 'profilePicture' parameter"
        });
      }
      try {
        await this.profileService.updateProfilePicture(userId, profilePicture);
        response.status(201).send({
          message: "Profile picture changed",
        });
      } catch (error) {
        response.status(400).send({
          message: "Error occurred while changing profile picture"
        });
      }
    }
  }

  public changeDescription() {
    return async (request: any, response: any) => {
      let userId = request.body?.userId;
      if (!userId) {
        return response.status(400).send({
          error: "Missing required 'userId' parameter"
        });
      }
      let description = request.body?.description;
      if (!description) {
        return response.status(400).send({
          error: "Missing required 'profilePicture' parameter"
        });
      }
      try {
        await this.profileService.updateDescription(userId, description);
        response.status(201).send({
          message: "Description changed"
        });
      } catch (error) {
        response.status(400).send({
          message: "Error occurred while changing description"
        });
      }
    }
  }

  public banUser() {
    return async (request: any, response: any) => {
      let userId = request.body?.userId;
      if (!userId) {
        return response.status(400).send({
          error: "Missing required 'userId' parameter"
        });
      }
      try {
        await this.profileService.updateIsBanned(userId, true);
        response.status(201).send({
          message: "user banned"
        });
      } catch (error) {
        response.status(400).send({
          message: "Error occurred while banning"
        });
      }
    }
  }

  public unbanUser() {
    return async (request: any, response: any) => {
      let userId = request.body?.userId;
      if (!userId) {
        return response.status(400).send({
          error: "Missing required 'userId' parameter"
        });
      }
      try {
        await this.profileService.updateIsBanned(userId, false);
        response.status(201).send({
          message: "user unbanned"
        });
      } catch (error) {
        response.status(400).send({
          message: "Error occurred while unbanning"
        });
      }
    }
  }

  // ---------- GET REQUESTS ----------

  public getProfileById() {
    return async (request: any, response: any) => {
      let userId = request.params.id;
      if (!userId) {
        return response.status(400).send({
          message: "Request is missing required 'userId' parameter"
        });
      }

      try {
        const profile = await this.profileService.getProfile(userId);
        return response.status(200).send(profile);
      } catch (error) {
        return response.status(404).send({
          message: "Profile not found"
        });
      }
    }
  }

  public getProfileByUserId() {
    return async (request: any, response: any) => {
      let userId = request.params.userId;
      if (!userId) {
        return response.status(400).send({
          message: "Request is missing required 'userId' parameter"
        });
      }

      try {
        const profile = await this.profileService.getProfileByUserId(userId);
        return response.status(200).send(profile);
      } catch (error) {
        return response.status(404).send({
          message: "Profile not found"
        });
      }
    }
  }

  public getProfileByNickname() {
    return async (request: any, response: any) => {
      let nickname = request.params.nickname;
      if (!nickname) {
        return response.status(400).send({
          message: "Request is missing required 'nickname' parameter"
        });
      }

      try {
        const profile = await this.profileService.getProfileByNickname(nickname);
        return response.status(200).send(profile);
      } catch (error) {
        return response.status(404).send({
          message: "Profile not found"
        });
      }
    }
  }

  public getAllProfiles() {
    return async (request: any, response: any) => {
      try {
        const profiles = await this.profileService.getAllProfiles();
        return response.status(200).send(profiles);
      } catch (error) {
        return response.status(404).send({
          message: "Something went wrong. Profiles not found, shit happens."
        });
      }
    }
  }
}
