import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game';
import { User } from '../user';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
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
export class DashboardComponent {
  user: User | undefined;
  users: User[] = [];
  destaqueGames: Game[] = [];
  allGames: Game[] = [];

  constructor(
    private userService: UserService, 
    private gameService: GameService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.checkIfLogged();
    this.getUser();
    this.getEmDestaqueGames();
    this.getAllGames();
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  getAllGames(): void {
    this.gameService.getGames()
      .subscribe(games => this.allGames = games)
  }

  getEmDestaqueGames(): void {
    this.gameService.getGames()
      .subscribe(games => this.destaqueGames = games.slice(0,3));
  }

  incCart(): void {
    if (!this.user) {
      console.error('User is not defined');
      return;
    }
    this.userService.incCart().subscribe(user => this.user = user);
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
