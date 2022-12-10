import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import { PanelUzytkownikaComponent } from './panel-uzytkownika.component';
import { PanelProfiluComponent } from './panel-profilu/panel-profilu.component';
import { PanelAdministratoraComponent } from './panel-administratora/panel-administratora.component';
import { PanelEdycjiComponent } from './panel-edycji/panel-edycji.component';


const appRoute: Routes = [
  {path: '', component: PanelProfiluComponent},
  {path: 'panel-profilu', component: PanelProfiluComponent},
  {path: 'panel-administratora', component: PanelAdministratoraComponent},
  {path: 'panel-edycji', component: PanelEdycjiComponent}
]

@NgModule({
  declarations: [
    PanelAdministratoraComponent,
    PanelProfiluComponent,
    PanelEdycjiComponent
  ],
  exports: [
    PanelProfiluComponent,
    PanelAdministratoraComponent,
    PanelEdycjiComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoute)
  ]
})
export class PanelUzytkownikaModule { }
