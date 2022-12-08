import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { PotwierdzenieComponent } from './potwierdzenie/potwierdzenie.component';
import { ResetowanieComponent } from './resetowanie/resetowanie.component';



@NgModule({
    declarations: [
        LogowanieComponent,
        RejestracjaComponent,
        PotwierdzenieComponent,
        ResetowanieComponent
    ],
  exports: [
    RejestracjaComponent,
    PotwierdzenieComponent,
    ResetowanieComponent,
    LogowanieComponent
  ],
    imports: [
        CommonModule
    ]
})
export class LogowanieIRejestracjaModule { }
