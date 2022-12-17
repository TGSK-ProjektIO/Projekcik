import {inject, injectable} from "inversify";
import {ProfileController} from "../controller/profile.controller";
import {TYPES} from "../config/types.config";
import {Express} from "express";

@injectable()
export class ProfileRouter {
  constructor(@inject(TYPES.ProfileController) private profileController: ProfileController) {

  }

  addRoutes(app: Express): void {
    app.put('/api/v1/panel-uzytkownika/profile/createProfile', this.profileController.createProfile());
    app.post('/api/v1/panel-uzytkownika/profile/changeNickname/:id/:nickname', this.profileController.changeNickname());
    app.post('/api/v1/panel-uzytkownika/profile/changeProfilePicture/:id/:profilePicture', this.profileController.changeProfilePicture());
    app.post('/api/v1/panel-uzytkownika/profile/changeDescription/:id/:description', this.profileController.changeDescription());
    app.post('/api/v1/panel-uzytkownika/profile/banUser/:id', this.profileController.banUser());
    app.post('/api/v1/panel-uzytkownika/profile/unbanUser/:id', this.profileController.unbanUser());
    app.get('/api/v1/panel-uzytkownika/profile/getProfile/:id', this.profileController.getProfileById());
    app.get('/api/v1/panel-uzytkownika/profile/getProfileByUserId/:userId', this.profileController.getProfileByUserId());
    app.get('/api/v1/panel-uzytkownika/profile/getProfileByNickname/:nickname', this.profileController.getProfileByNickname());
    app.get('/api/v1/panel-uzytkownika/profile/getAllProfiles', this.profileController.getAllProfiles());
  }
}

