import { NgModule } from '@angular/core';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view/user-view.component';
import { UserReportComponent } from './user-report/user-report.component';
import { AllReportsUserComponent } from './user-view/all-reports-user/all-reports-user.component';
import { AdministratorViewComponent } from './administrator-view/administrator-view.component';
import { UserReportFormComponent } from './user-report/user-report-form/user-report-form.component';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {SugestieIZgloszeniaRoutingModule} from "./sugestie-i-zgloszenia-routing.module";
import {AllReportsAdminComponent} from "./administrator-view/all-reports-admin/all-reports-admin.component";

@NgModule({
  declarations: [
    UserViewComponent,
    UserReportComponent,
    AllReportsUserComponent,
    AdministratorViewComponent,
    UserReportFormComponent,
    AllReportsAdminComponent
  ],
  exports: [
    AdministratorViewComponent,
    UserReportComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SugestieIZgloszeniaRoutingModule,
    FormsModule
  ]
})
export class SugestieIZgloszeniaModule { }
