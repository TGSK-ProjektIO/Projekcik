import {RouterModule, Routes} from "@angular/router";
import {WyszukiwanieComponent} from "./wyszukiwanie.component";
import {WyszukajProduktLubProfilComponent} from "./wyszukaj-produkt-lub-profil/wyszukaj-produkt-lub-profil.component";
import {NgModule} from "@angular/core";

const routes: Routes = [
  {
    path: 'search',
    component: WyszukiwanieComponent,
    children: [
      {
        path: '',
        component: WyszukajProduktLubProfilComponent
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
export class WyszukiwanieRoutingModule {}
