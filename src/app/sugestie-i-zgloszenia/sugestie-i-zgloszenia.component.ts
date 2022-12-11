import { Component, OnInit } from '@angular/core';
import {ReportController} from "./ReportController";
import {User} from "./User";
import {Opinion} from "./Opinion";
import {TypeOfReport} from "./TypeOfReport";

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
    this.interface.sendReport(new User("Adam"), new Opinion("Kebab1 #opinion"), TypeOfReport.ErrorInDescription, "Theres no fruits involved in this dish");
    this.interface.sendReport(new User("Krystyna"), new Opinion("Kebab2 #opinion"), TypeOfReport.ErrorInDescription, "The prize is actually to high");
    this.interface.sendReport(new User("Tomasz"), new Opinion("Książka #opinion"), TypeOfReport.Other, "I believe this opinion was written by a MADMAN!");
    this.interface.sendReport(new User("Juzek"), new Opinion("Monitor #opinion"), TypeOfReport.WrongValue, "Should be 0");
    this.interface.sendReport(this.loggedUser, new Opinion("Wałek #opinion"), TypeOfReport.WrongValue, "Actually the specified product changed their prize");
    this.interface.sendReport(this.loggedUser, new Opinion("Toyota Camry #opinion"), TypeOfReport.Other, "That product doesn't exist!");
  }

  //title = `Angular ${VERSION.full} is rad!`;

}
