import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AdministratorViewComponent} from "./administrator-view/administrator-view.component";
import {UserViewComponent} from "./user-view/user-view.component";
import {UserReportComponent} from "./user-report/user-report.component";
import {SugestieIZgloszeniaComponent} from "./sugestie-i-zgloszenia.component";

const routes: Routes = [
  {
    path: '',
    component: SugestieIZgloszeniaComponent,
    children: [
      {
        path: 'administrator-view',
        component: AdministratorViewComponent
      },
      {
        path: 'user-view',
        component: UserViewComponent
      },
      {
        path: 'user-report',
        component: UserReportComponent
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
