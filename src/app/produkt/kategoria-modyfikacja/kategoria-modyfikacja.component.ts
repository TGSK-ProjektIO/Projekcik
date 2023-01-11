import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { ProduktService } from '../services/produkt.service';
import { Category } from 'express-backend-api/model/category';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'  

@Component({
  selector: 'app-kategoria-modyfikacja',
  templateUrl: './kategoria-modyfikacja.component.html',
  styleUrls: ['./kategoria-modyfikacja.component.css']
})

export class KategoriaModyfikacjaComponent implements OnInit {

  _id = '';
  name = '';

  category: any;
  path: string = window.location.href;
  lastPath: string = this.path.substring(this.path.lastIndexOf('/') + 1);
  modifyPath: string = '';

  attributesForm: FormGroup;
  attrib: Array<string> = [];
  att: string;
  attributesHTML: any;

  constructor(private router: Router, private service: ProduktService, private fb:FormBuilder) {
    this.attributesForm = this.fb.group({  
      attributes: this.fb.array<String>([]) ,  
    });  
    }

    ngOnInit(): void {
      this.service.getCategory(this.lastPath)
      .subscribe(response => {
        this.category = response;
        this.attributesHTML = this.category.attributes;
      });
      
      console.log(this.attributesHTML);
    }

    redirectToMainPage() {
      this.router.navigateByUrl('/');
    }

    redirectToCategoryList() {
      this.modifyPath = "/produkt/kategoria-lista";
      this.router.navigateByUrl(this.modifyPath);
    }
  
    onModifyPressed() {
      this.getAttributes();
      //this.category.id = this.lastPath;
      //this.category.name = this.name;
      this.category.attributes = this.attrib;
      this.service.modifyCategory(this.lastPath, this.category)
      .subscribe(response => {
        this.category = response;
      });

    }


    onSavePressed() {
      this.modifyPath = "http://localhost:3000/api/v1/produkt/category/" + this.lastPath;
      fetch(this.modifyPath, {
        method: 'PUT',
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
          console.log("hi");
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
      console.log(this.attributes().value);
    }  
       
    removeAttribute(i:number) {  
      console.log(i);
      this.attributes().removeAt(i);  
    }  

    getAttributes() {
      console.log("getAttributes");
      for (let i = 0; i < this.attributes().length; i++) {
        this.att = this.attributes().at(i).value.attribute;
        this.attrib.push(this.att);
      }

    }
}
