import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Game } from '../game';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recieve-present',
  templateUrl: './recieve-present.component.html',
  styleUrls: ['./recieve-present.component.css'],
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
export class RecievePresentComponent {
  games: Game[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService, 
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkIfLogged();
    this.getRecievedGames();
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

  getRecievedGames(): void {
    this.gameService.getRecievedGames().subscribe(games => this.games = games);
  }

  confirm(id:string): void {
    
  }

  decline(id:string): void {
    
  }
}
