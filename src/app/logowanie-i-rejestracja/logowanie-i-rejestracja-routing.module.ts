import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {LogowanieComponent} from "./logowanie/logowanie.component";
import {RejestracjaComponent} from "./rejestracja/rejestracja.component";
import {PotwierdzenieComponent} from "./potwierdzenie/potwierdzenie.component";
import {ResetowanieComponent} from "./resetowanie/resetowanie.component";
import {LogowanieIRejestracjaComponent} from "./logowanie-i-rejestracja.component";
import {ResetowaniePotwierdzenieComponent} from "./resetowanie-potwierdzenie/resetowanie-potwierdzenie.component";
import {WeryfikacjaPotwierdzenieComponent} from "./weryfikacja-potwierdzenie/weryfikacja-potwierdzenie.component";

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
      },
      {
        path: 'reset',
        component: ResetowaniePotwierdzenieComponent
      },
      {
        path: 'confirm/:id/:emailToken',
        component: WeryfikacjaPotwierdzenieComponent
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
