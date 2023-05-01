import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game } from '../game';
import { GameService } from '../game.service';

import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  game: Game | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService, 
    private gameService: GameService,
    private location: Location,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.checkIfLogged();
    this.getGame();
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

}

