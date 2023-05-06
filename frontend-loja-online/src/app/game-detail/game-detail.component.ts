import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game } from '../game';
import { GameService } from '../game.service';


import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
  animations: [
    trigger('fadeInOut', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('0.5s ease-in-out', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          animate('0.5s ease-in-out', style({ opacity: 0 }))
        ])
      ])
  ]
})
export class GameDetailComponent {
  game: Game | undefined;
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService, 
    private gameService: GameService,
    private location: Location,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.checkIfLogged();
    this.getUser();
    this.getGame();
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  getGame(): void {
    const id = this.route.snapshot.params['id'];
    this.gameService.getGameById(id).subscribe(game => this.game = game);
  }

  goBack(): void {
    this.location.back();
  }

  doLogOut(): void {
    this.userService.logOutUser()
      .subscribe(
        (response) => {
          alert(response.message);
          // Redirect to login page
          this.router.navigate(['/login']);
        }
      );
  }

  checkIfLogged(): void {
    this.userService.checkIfLogged()
    .subscribe(
      (response) => {
        if(!response.value) {
          alert("Nenhum Utilizador autenticado.");
          this.router.navigate(['/login']);
        }
      }
    );
  }

  addToWishlist(game: Game) {
    if (this.user) {
      if (!this.user.wishList.some(wishGame => wishGame.toString() === game._id)) {
        this.user.wishList.push(game);
        this.userService.updateUser(this.user).subscribe(() => {
          alert(`Adicionado o jogo ${game.name} à wishlist`);
          window.scrollTo(0, 0);
          this.router.navigate(['/wishlist']);
        });
      } else {
        alert(`Erro, o jogo ${game.name} já existe na wishlist`);
      }
    }
  }

}

