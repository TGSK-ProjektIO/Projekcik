import {Component, OnInit} from '@angular/core';
import {PageType} from "../../opinie/opinie.component";
import {ActivatedRoute, Router} from "@angular/router";
import {PanelUzytkownikaComponent} from "../panel-uzytkownika.component";
import {Profile} from "../../../../express-backend-api/model/profile";
import * as url from "url";

@Component({
  selector: 'app-panel-profilu',
  templateUrl: './panel-profilu.component.html',
  styleUrls: ['./panel-profilu.component.css']
})
export class PanelProfiluComponent implements OnInit {

  pageTypes: PageType = PageType.profile

  showEditButton: boolean = false
  showAdminButton: boolean = false
  showBanned: boolean = false
  profile: Profile

  constructor(private router: Router, public mainComp: PanelUzytkownikaComponent, private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    //this.mainComp.ngOnInit();
  }

  redirectToEdit() {
    this.router.navigateByUrl(this.router.url + '/edytuj-profil');
  }

  redirectToAdmin() {
    this.router.navigateByUrl('/panel-administratora');
  }

  // Placeholder (don't sue us)
  isCurrent = true
  mock_user = {
    name: 'MaciekIO116',
    profile_picture: 'https://i.etsystatic.com/34732889/r/il/b08942/3768265623/il_794xN.3768265623_sji1.jpg',
    description: 'A, wie pan, moim zdaniem to nie ma tak, że dobrze, albo że niedobrze.\n' +
      'Gdybym miał powiedzieć, co cenię w życiu najbardziej, powiedziałbym, że ludzi.\n' +
      'Ludzi, którzy podali mi pomocną dłoń, kiedy sobie nie radziłem, kiedy byłem sam,\n' +
      'i co ciekawe, to właśnie przypadkowe spotkania wpływają na nasze życie.',
    isAdmin: true,
    isBanned: false
  }

  // Placeholder
  mock_opinions = [
    {
      product: 'Odkurzacz',
      img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flevelsolved.com%2Fwp-content%2Fuploads%2F2019%2F11%2FGenshin-Impact-Logo.png&f=1&nofb=1&ipt=9586aba2f7f5b82a8c9f25ca8ee9e9e6e02bd830adba516dee37878567b33dec&ipo=images',
      text: 'Odkurzacz bardzo fajny, polecam. Podoba mi się jego zielonkawy kolor',
      likes: 12,
      dislikes: 2
    },
    {
      product: 'Kremówka',
      img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fszkolawtelno.edu.pl%2Fwp-content%2Fuploads%2F2018%2F10%2Fa-768x768.jpg&f=1&nofb=1&ipt=56a5b1ed96c22491f21d4f2adbc959bf3010f4af89eecba5bce4a9b31cb7abaa&ipo=images',
      text: 'Kremówka za 21,37zł? Zdzierstwo!',
      likes: 21,
      dislikes: 37
    },
    {
      product: 'Monsoon',
      img: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fvignette.wikia.nocookie.net%2Fmetalgear%2Fimages%2F6%2F6f%2FMonsoonI4.png%2Frevision%2Flatest%3Fcb%3D20131227120722&f=1&nofb=1&ipt=a9b12c5323d554e640031e7e9ff9ef5a41f328e980e6328162714f66c4f8adde&ipo=images',
      text: 'Feasting on the insides of your enemies. How easily you ignore the loss of life when it suits your convenience. So tell me: who saves the weak from the man who saves the weak? Kill or be killed Jack. Phnom Penh taught me that. Yes, you aren’t the only one to grow up on the killing fields. War is a cruel parent but an effective teacher. It’s final lesson is carved deep in my psyche: that this world, and all it’s people are diseased. Free will is a myth. Religion is a joke. We are all pawns, controlled by something greater: memes. The DNA of the soul. They shape our will. They are the culture — they are everything we pass on. Expose someone to anger long enough, they will learn to hate. They become a carrier. Envy, greed, despair... All memes, all passed along. You can’t fight nature, Jack. Wind blows, rain falls, and the strong pray upon the weak. Sam tells me you see your weapon as a tool. Something that saves lives — a means of justice. Now there’s a pretty meme. Exquisite! It’s spared you the burden of all the lives you’ve taken... ...absolved you of guilt when you enjoyed it. That is until the illusion was broken. Don’t be ashamed. It’s only nature, running its course. You have no choices to make. Nothing to answer for. You can die with a clear conscience.!',
      likes: 116,
      dislikes: 34
    }
  ]

}
