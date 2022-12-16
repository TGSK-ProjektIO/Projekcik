import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import { PanelProfiluComponent } from './panel-profilu/panel-profilu.component';
import { PanelAdministratoraComponent } from './panel-administratora/panel-administratora.component';
import { PanelEdycjiComponent } from './panel-edycji/panel-edycji.component';
import {MatTabsModule} from "@angular/material/tabs";
import {OpinieModule} from "../opinie/opinie.module";
import {PanelUzytkownikaComponent} from "./panel-uzytkownika.component";
import {PanelUzytkownikaRoutingModule} from "./panel-uzytkownika-routing.module";

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
    MatTabsModule,
    PanelUzytkownikaRoutingModule,
    OpinieModule
  ]
})
export class PanelUzytkownikaModule { }
