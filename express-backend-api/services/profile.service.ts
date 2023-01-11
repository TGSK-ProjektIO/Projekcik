import {inject, injectable} from "inversify";
import {ProfileRepository} from "../repository/profile.repository";
import {TYPES} from "../config/types.config";
import {Profile} from "../model/profile";
import {User} from "../model/user";

@injectable()
export class ProfileService {
  constructor(@inject(TYPES.ProfileRepository) private profileRepository: ProfileRepository) {
  }

  public createProfile(user: User): Promise<Profile> {
    let profile: Profile = {
      userId: user._id.toString(),
      nickname: user.username,
      profilePicture: "",
      description: null,
      isBanned: false
    }
    return this.profileRepository.create(profile);
  }

  public updateNickname(userId: string, newNickname: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const profile = await this.profileRepository.read(userId);
        profile.nickname = newNickname;
        await this.profileRepository.update(profile);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  public updateProfilePicture(userId: string, newProfilePicture: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const profile = await this.profileRepository.read(userId);
        profile.profilePicture = newProfilePicture;
        await this.profileRepository.update(profile);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  public updateDescription(userId: string, newDescription: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const profile = await this.profileRepository.read(userId);
        profile.description = newDescription;
        await this.profileRepository.update(profile);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  public updateIsBanned(userId: string, newIsBanned: boolean): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const profile = await this.profileRepository.read(userId);
        profile.isBanned = newIsBanned;
        await this.profileRepository.update(profile);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  public getProfile(userId: string): Promise<Profile> {
    return this.profileRepository.read(userId);
  }

  public getProfileByUserId(userId: string): Promise<Profile> {
    return this.profileRepository.readByUserId(userId);
  }

  public getProfileByNickname(nickname: string): Promise<Profile> {
    return this.profileRepository.readByNickname(nickname);
  }

  public getAllProfiles(): Promise<Array<Profile>> {
    return this.profileRepository.readAll();
  }
}
