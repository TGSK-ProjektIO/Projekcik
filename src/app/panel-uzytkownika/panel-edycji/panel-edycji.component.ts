import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {PanelUzytkownikaComponent} from "../panel-uzytkownika.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel-edycji',
  templateUrl: './panel-edycji.component.html',
  styleUrls: ['./panel-edycji.component.css']
})
export class PanelEdycjiComponent implements OnInit {

  constructor(private router: Router, public mainComp: PanelUzytkownikaComponent) { }

  nicknameField: HTMLInputElement;
  descriptionField: HTMLTextAreaElement;

  ngOnInit(): void {
    this.nicknameField = document.getElementById('nicknameField') as HTMLInputElement;
    this.descriptionField = document.getElementById('descriptionField') as HTMLTextAreaElement;

    this.nicknameField.value = this.mainComp.profile.nickname;
    this.descriptionField.value = this.mainComp.profile.description!;

    console.log("EDIT:" + this.mainComp.profile.nickname);
  }

  onNicknameChange() {
    let newNickname = this.nicknameField.value;
    this.mainComp.profile.nickname = newNickname;
    this.mainComp.fetchUpdateProfile(this.mainComp.profile);
  }

  onDescriptionChange() {
    let newDescription= this.descriptionField.value;
    this.mainComp.profile.description = newDescription;
    this.mainComp.fetchUpdateProfile(this.mainComp.profile);
  }

  redirectToProfile() {
    this.router.navigateByUrl('');
  }

}
