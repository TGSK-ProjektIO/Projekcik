import { Component, OnInit } from '@angular/core';
import {ReportController} from "./ReportController";
import {User} from "./User";
import {TypeOfReport} from "./TypeOfReport";
import {Product} from "../produkt/Product";

@Component({
  selector: 'app-sugestie-i-zgloszenia',
  templateUrl: './sugestie-i-zgloszenia.component.html',
  styleUrls: ['./sugestie-i-zgloszenia.component.css']
})
export class SugestieIZgloszeniaComponent implements OnInit {

  interface: ReportController = new ReportController();

  // Sample
  loggedUser: User = new User("Dorota");

  ngOnInit(): void {
    // Sample
    this.interface.sendReport(new User("Adam"), new Product("null","Kebab1","null", "null"), TypeOfReport.ErrorInDescription, "Theres no fruits involved in this dish");
    this.interface.sendReport(new User("Krystyna"), new Product("null","Kebab2","null", "null"), TypeOfReport.ErrorInDescription, "The prize is actually to high");
    this.interface.sendReport(new User("Tomasz"), new Product("null","Książka","null", "null"), TypeOfReport.Other, "I believe this opinion was written by a MADMAN!");
    this.interface.sendReport(new User("Juzek"), new Product("null","Monitor","null", "null"), TypeOfReport.WrongValue, "Should be 0");
    this.interface.sendReport(this.loggedUser, new Product("null","Wałek","null", "null"), TypeOfReport.WrongValue, "Actually the specified product changed their prize");
    this.interface.sendReport(this.loggedUser, new Product("null","Toyota Camry","null", "null"), TypeOfReport.Other, "That product doesn't exist!");
  }

  //title = `Angular ${VERSION.full} is rad!`;

}
