import {Component, OnInit} from '@angular/core';
import {PageType} from "../../opinie/opinie.component";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Profile} from "../../../../express-backend-api/model/profile";

@Component({
  selector: 'app-panel-profilu',
  templateUrl: './panel-profilu.component.html',
  styleUrls: ['./panel-profilu.component.css']
})
export class PanelProfiluComponent implements OnInit {

  pageTypes: PageType = PageType.profile;
  userId: string;
  profile: Profile = {} as Profile;

  showEditButton: boolean = true;
  showAdminButton: boolean = true;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      this.userId = params['id'];
      console.log(this.userId);
    });

    this.fetchProfileByUserId(this.userId);
  }

  redirectToEdit() {
    this.router.navigate(["/profil/panel-edycji"]);
  }

  redirectToAdmin() {
    this.router.navigateByUrl('/profil/panel-administratora');
  }

  private async fetchProfileByUserId(userId: string): Promise<void> {
    return await fetch(`http://localhost:3000/api/v1/panel-uzytkownika/profile/getProfileByUserId/${userId}`, {
      method: 'GET',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    }).then(async response => {
      this.profile = await response.json();
      localStorage.setItem("profileId", this.profile.userId);
    }).catch(err => {
      console.error(err);
    });
  }
}
