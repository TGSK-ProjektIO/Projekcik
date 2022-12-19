import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule} from "@angular/material/tabs";

import { PanelProfiluComponent } from './panel-profilu/panel-profilu.component';
import { PanelAdministratoraComponent } from './panel-administratora/panel-administratora.component';
import { PanelEdycjiComponent } from './panel-edycji/panel-edycji.component';
import {OpinieModule} from "../opinie/opinie.module";
import {PanelUzytkownikaRoutingModule} from "./panel-uzytkownika-routing.module";
import {FormsModule} from "@angular/forms";

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
    OpinieModule,
    FormsModule,
  ]
})
export class PanelUzytkownikaModule { }
