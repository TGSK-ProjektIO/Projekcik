import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {LogowanieComponent} from "./logowanie/logowanie.component";
import {RejestracjaComponent} from "./rejestracja/rejestracja.component";
import {PotwierdzenieComponent} from "./potwierdzenie/potwierdzenie.component";
import {ResetowanieComponent} from "./resetowanie/resetowanie.component";
import {LogowanieIRejestracjaComponent} from "./logowanie-i-rejestracja.component";

const routes: Routes = [
  {
    path: '',
    component: LogowanieIRejestracjaComponent,
    children: [
      {
        path: 'login',
        component: LogowanieComponent
      },
      {
        path: 'register',
        component: RejestracjaComponent
      },
      {
        path: 'confirmation',
        component: PotwierdzenieComponent
      },
      {
        path: 'reset-password',
        component: ResetowanieComponent
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
export class LogowanieIRejestracjaRoutingModule { }
