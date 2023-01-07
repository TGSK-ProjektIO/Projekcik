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


  productForm: FormGroup;
  
  constructor(private router: Router, private fb:FormBuilder) {
         
    this.productForm = this.fb.group({  
      name: '',  
      quantities: this.fb.array([]) ,  
    });  
  }
    

    ngOnInit(): void {
    }

    redirectToCategoryList() {
      this.modifyPath = "/produkt/kategoria-lista";
      this.router.navigateByUrl(this.modifyPath);
    }

  
    onSavePressed() {
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

    quantities() : FormArray {  
      return this.productForm.get("quantities") as FormArray  
    }  
       
    newQuantity(): FormGroup {  
      return this.fb.group({  
        qty: '',  
        price: '',  
      })  
    }  
       
    addQuantity() {  
      this.quantities().push(this.newQuantity());  
    }  
       
    removeQuantity(i:number) {  
      this.quantities().removeAt(i);  
    }  
       
    onSubmit() {  
      console.log(this.productForm.value);  
    }  
  

}

