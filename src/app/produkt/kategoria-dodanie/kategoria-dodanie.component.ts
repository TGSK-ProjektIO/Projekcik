import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ProduktComponent} from '../produkt.component';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'  


@Component({
  selector: 'app-kategoria-dodanie',
  templateUrl: './kategoria-dodanie.component.html',
  styleUrls: ['./kategoria-dodanie.component.css']
})

export class KategoriaDodanieComponent implements OnInit {

  name = '';
  attribute: Array<Object>;
  modifyPath: string = '';


  attributesForm: FormGroup;

  constructor(private router: Router, private fb:FormBuilder) {
         
    this.attributesForm = this.fb.group({  
      attributes: this.fb.array([]) ,  
    });  
  }
    

    ngOnInit(): void {
    }

    redirectToCategoryList() {
      this.modifyPath = "/produkt/kategoria-lista";
      this.router.navigateByUrl(this.modifyPath);
    }

  
    onSavePressed() {
      console.log(this.attributesForm.value); 
      fetch('http://localhost:3000/api/v1/produkt/category', {
        method: 'POST',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "name": this.name,
        })
      }).then(async response => {
        if (response.status === 201) {
          await this.router.navigateByUrl('/');
        }
        if (response.status === 404) {
        }
      }).catch(err => {
        console.error(err);
      }); 
    }

    attributes() : FormArray {  
      return this.attributesForm.get("attributes") as FormArray  
    }  
       
    newAttribute(): FormGroup {  
      return this.fb.group({  
        attribute: '',  
      })  
    }  
       
    addAttribute() {  
      this.attributes().push(this.newAttribute());  
      console.log(this.attributes().length);
    }  
       
    removeAttribute(i:number) {  
      this.attributes().removeAt(i);  
    }  
  

}

