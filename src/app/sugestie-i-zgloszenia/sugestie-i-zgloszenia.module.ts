import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserViewComponent } from './user-view/user-view.component';
import { UserReportComponent } from './user-report/user-report.component';
import { AllReportsUserComponent } from './user-view/all-reports-user/all-reports-user.component';
import { AllReportsAdminComponent } from './administrator-view/all-reports-admin/all-reports-admin.component';
import { UserReportFormComponent } from './user-report/user-report/user-report.component';
import {RouterLink, RouterModule, Routes} from "@angular/router";
import {SugestieIZgloszeniaComponent} from "./sugestie-i-zgloszenia.component";

const appRoute: Routes = [
  {path: '', component: SugestieIZgloszeniaComponent},
  {path: 'report-form', component: UserReportFormComponent}
]

@NgModule({
  declarations: [
    UserViewComponent,
    UserReportComponent,
    AllReportsUserComponent,
    AllReportsAdminComponent,
    UserReportFormComponent
  ],
  exports: [
    AllReportsAdminComponent,
    UserReportComponent,
    UserViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot([]),
    RouterLink
  ]
})
export class SugestieIZgloszeniaModule { }
