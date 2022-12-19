import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdministratorViewComponent} from "./administrator-view/administrator-view.component";
import {UserViewComponent} from "./user-view/user-view.component";
import {UserReportComponent} from "./user-report/user-report.component";
import {SugestieIZgloszeniaComponent} from "./sugestie-i-zgloszenia.component";
import {AllReportsAdminComponent} from "./administrator-view/all-reports-admin/all-reports-admin.component";
import {AllReportsUserComponent} from "./user-view/all-reports-user/all-reports-user.component";
import {UserReportFormComponent} from "./user-report/user-report-form/user-report-form.component";

const routes: Routes = [
  {
    path: 'sugg',
    component: SugestieIZgloszeniaComponent,
    children: [
      {
        path: 'administrator-view',
        component: AdministratorViewComponent,
        children: [
          {
            path: 'all-reports-admin',
            component: AllReportsAdminComponent
          }
        ]
      },
      {
        path: 'user-view',
        component: UserViewComponent,
        children: [
          {
            path: 'all-reports-user',
            component: AllReportsUserComponent
          }
        ]
      },
      {
        path: 'user-report',
        component: UserReportComponent,
        children: [
          {
            path: 'user-report-form',
            component: UserReportFormComponent
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class SugestieIZgloszeniaRoutingModule { }
