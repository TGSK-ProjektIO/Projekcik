import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";

import { PanelProfiluComponent } from './panel-profilu/panel-profilu.component';
import { PanelAdministratoraComponent } from './panel-administratora/panel-administratora.component';
import { PanelEdycjiComponent } from './panel-edycji/panel-edycji.component';
import {MatTabsModule} from "@angular/material/tabs";


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
        RouterModule.forRoot(appRoute, { paramsInheritanceStrategy: 'always' }),
        MatTabsModule
    ]
})
export class PanelUzytkownikaModule { }
