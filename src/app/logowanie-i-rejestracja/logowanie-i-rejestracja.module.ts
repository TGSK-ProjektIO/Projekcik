import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogowanieComponent } from './logowanie/logowanie.component';
import { RejestracjaComponent } from './rejestracja/rejestracja.component';
import { PotwierdzenieComponent } from './potwierdzenie/potwierdzenie.component';
import { ResetowanieComponent } from './resetowanie/resetowanie.component';
import { LogowanieIRejestracjaRoutingModule } from './logowanie-i-rejestracja-routing.module';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import { ResetowaniePotwierdzenieComponent } from './resetowanie-potwierdzenie/resetowanie-potwierdzenie.component';
import { WeryfikacjaPotwierdzenieComponent } from './weryfikacja-potwierdzenie/weryfikacja-potwierdzenie.component';
import {AlertConfig, AlertModule} from "ngx-bootstrap/alert";
import {AppComponent} from "../app.component";
import {LogowanieIRejestracjaComponent} from "./logowanie-i-rejestracja.component";
import { GithubResponseComponent } from './github-response/github-response.component';



@NgModule({
    declarations: [
        LogowanieComponent,
        RejestracjaComponent,
        PotwierdzenieComponent,
        ResetowanieComponent,
        ResetowaniePotwierdzenieComponent,
        WeryfikacjaPotwierdzenieComponent,
        GithubResponseComponent
    ],
  exports: [
    RejestracjaComponent,
    PotwierdzenieComponent,
    ResetowanieComponent,
    LogowanieComponent,
    ResetowaniePotwierdzenieComponent,
    WeryfikacjaPotwierdzenieComponent
  ],
    imports: [
        CommonModule,
        BrowserModule,
        LogowanieIRejestracjaRoutingModule,
        FormsModule,
        AlertModule
    ],
})
export class LogowanieIRejestracjaModule { }
