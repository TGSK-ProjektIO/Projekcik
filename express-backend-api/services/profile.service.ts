import {inject, injectable} from "inversify";
import {ProfileRepository} from "../repository/profile.repository";
import {TYPES} from "../config/types.config";
import {Profile} from "../model/profile";

@injectable()
export class ProfileService {
  constructor(@inject(TYPES.ProfileRepository) private profileRepository: ProfileRepository) {

  }

  public createProfile(profile: Profile): Promise<Profile> {
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

  public getProfileByNickname(nickname: string): Promise<Profile> {
    return this.profileRepository.readByNickname(nickname);
  }

  // TODO: Phonk about stuff here
/*  public getNickname(id: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const profile = await this.profileRepository.read(id);
        resolve(profile.nickname === null);
      } catch (error) {
        reject();
      }
    });
  }

  private getProfilePicture(profilePicture: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      try {
        await this.profileRepository.readByEmail(email);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }

  private isEmailCorrect(email: string): Promise<boolean> {
    return new Promise<boolean>(async (resolve) => {
      try {
        await this.userRepository.readByEmail(email);
        resolve(true);
      } catch (error) {
        resolve(false);
      }
    });
  }*/
}
