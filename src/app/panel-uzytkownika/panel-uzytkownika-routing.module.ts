import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import { PanelProfiluComponent } from './panel-profilu/panel-profilu.component';
import { PanelAdministratoraComponent } from './panel-administratora/panel-administratora.component';
import { PanelEdycjiComponent } from './panel-edycji/panel-edycji.component';
import {PanelUzytkownikaComponent} from "./panel-uzytkownika.component";


const appRoute: Routes = [
  {
    path: `profil`,
    component: PanelUzytkownikaComponent,
    children: [
      {
        path: 'panel-profilu/:id',
        component: PanelProfiluComponent
      },
      {
        path: 'panel-edycji',
        component: PanelEdycjiComponent
      },
      {
        path: 'panel-administratora',
        component: PanelAdministratoraComponent
      }
    ]
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRoute),
  ],
  exports: [
    RouterModule
  ]
})
export class PanelUzytkownikaRoutingModule { }
