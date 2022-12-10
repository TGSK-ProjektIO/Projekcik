import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produkt-modyfikacja',
  templateUrl: './produkt-modyfikacja.component.html',
  styleUrls: ['./produkt-modyfikacja.component.css']
})

export class ProduktModyfikacjaComponent implements OnInit {


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
