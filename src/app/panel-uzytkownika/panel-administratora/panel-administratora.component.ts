import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-panel-administratora',
  templateUrl: './panel-administratora.component.html',
  styleUrls: ['./panel-administratora.component.css']
})
export class PanelAdministratoraComponent implements OnInit {

  constructor(private router: Router) { }

  redirectToProfile() {
    this.router.navigateByUrl('/profil/');
  }

  // Placeholder
  mock_suggestions = [
    {
      username: 'JaśJakiś123',
      product: 'Dokurzacz',
      type: 'Zła kategoria',
      description: 'Dokurzacz nie powinien być w kategorii Kosmetyki. Poprawna kategoria to AGD.'
    },
    {
      username: 'NiefajnyKoles',
      product: 'Doniczka',
      type: 'Zła wartość',
      description: 'oksadfiopasdhfiposdfoipajweopifjewopijfoepiwpfowejfpoijfoiwejopuwu'
    },
    {
      username: 'Agata2323',
      product: 'iPhone 10',
      type: 'Zły opis',
      description: 'W opisie jest błędnie podane, że iPhone ma system operacyjny Windows.'
    }
  ]

  // Placeholder
  mock_products = [
    {
      name: 'Odkurzacz',
      description: 'Inteligentny odkurzacz marki Electrolux.',
      category: 'AGD',
      tags: ['AGD', 'sprzęt', 'Electrolux']
    },
    {
      name: 'Biurko',
      description: 'Drewniane biurko o szerokości 180cm. Posiada dwie szuflady.',
      category: 'meble',
      tags: ['drewno', 'meble']
    },
    {
      name: 'iPhone 10',
      description: 'Smartfon iPhone 10 marki Apple. Ma 12 wbudowanych aparatów o rozdzielczości 8k.',
      category: 'telefony',
      tags: ['Apple', 'smartfon', '8k']
    },
    {
      name: 'Śrubokręt',
      description: 'Śrubokręt z końcówką +.',
      category: 'narzędzia',
      tags: ['plus', 'przydatne']
    },
  ]

  // Placeholder
  mock_categories = [
    {
      name: `agd`
    },
    {
      name: `meble`
    },
    {
      name: `kosmetyki`
    },
    {
      name: `ksiazki`
    },
    {
      name: `zabawki`
    }
  ]

  ngOnInit(): void {
  }

  banUser(): void {
    window.alert("Nie znaleziono użytkownika o takim pseudonimie.")
  }

}
