import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Game } from '../game';
import { GameService } from '../game.service';


import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { filter } from 'rxjs';

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
  currentInput: string;
  classifications = new Map<number, number>();
  
  constructor(
    private route: ActivatedRoute,
    private userService: UserService, 
    private gameService: GameService,
    private location: Location,
    private router: Router,
    ) {
      this.currentInput = "";
    }
    
    
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
      this.gameService.getGameById(id).subscribe(game => {
        this.game = game;
      
        for (var i=1; i <=5; i++ ) {
          this.classifications.set(i, this.game.allClassifications.filter(c => c == i).length);
        }

        if (game.allClassifications.length == 0) {
          this.game.avgClassification = 0;
        }
    });

    }
    
    saveInput(inputValue: string) {
      this.currentInput = inputValue;
    }
    
    classify(): void {
      const classification = Number(this.currentInput);
      
      if (!this.game) {
        console.error('game is not defined');
        return;
      }
      
      if (isNaN(classification) || classification < 1 || classification > 5) {
        console.error('error in input');
        return;
      }
      
      this.gameService.classify(this.game, classification).subscribe(game => {this.game = game;
        this.classifications.set(classification, this.game.allClassifications.filter(c => c == classification).length);
      });

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
        
        goToSendPresent(): void {
          const id = this.route.snapshot.params['id'];
          this.router.navigate([`/send/${id}`]);
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
      
      