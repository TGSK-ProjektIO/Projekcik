import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import { OpinieComponent } from './opinie.component';

const routes: Routes = [
  {
    path: '',
    component: OpinieComponent,
    children: [
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
export class OpinieRoutingModule{}
