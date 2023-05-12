import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { Game } from '../game';

@Component({
  selector: 'app-user-wishlist',
  templateUrl: './user-wishlist.component.html',
  styleUrls: ['./user-wishlist.component.css']
})
export class UserWishlistComponent {
  user: User | undefined;
  userWishlist: Game[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private gameService: GameService,
  ) {}

  ngOnInit(): void {
    this.checkIfLogged();
    this.getUser();
    this.getUserWishlist();
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  getUserWishlist(): void {
    this.userService.getUserWishlist()
      .subscribe(wishlist => this.userWishlist = wishlist);
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

  removeFromWishlist(game: Game) {
    if (this.user) {
      const gameIndex = this.user.wishList.findIndex(wishGame => wishGame.toString() === game._id);
  
      if (gameIndex !== -1) {
        this.user.wishList.splice(gameIndex, 1);
        this.userService.updateUser(this.user).subscribe(() => {
          alert(`Removido o jogo ${game.name} da wishlist`);
  
          // Remove the game from the local userWishlist variable
          this.userWishlist.splice(gameIndex, 1);
  
          window.scrollTo(0, 0);
          this.router.navigate(['/wishlist']);
        });
      } else {
        alert(`Erro, o jogo ${game.name} não foi encontrado na wishlist`);
      }
    }
  }
   
}