import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-produkt-dodanie',
  templateUrl: './produkt-dodanie.component.html',
  styleUrls: ['./produkt-dodanie.component.css']
})

export class ProduktDodanieComponent implements OnInit {

  description: string = '';
  name: string = '';
  category: string = '';
  constructor() {
    }

    ngOnInit(): void {
    }

    onClick() {
      window.alert("Clicked")
    }

    blurEventName(event: any) {

      this.name = event.target.value;
    }

    blurEventDescription(event: any) {

      this.description = event.target.value;
    }

    blurEventCategory(event: any) {

      this.category= event.target.value;
    }
    
}
