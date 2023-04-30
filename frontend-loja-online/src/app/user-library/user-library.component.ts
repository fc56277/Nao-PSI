import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { Game } from '../game';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.css']
})
export class UserLibraryComponent {
  user: User | undefined;
  allGames: Game[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private gameService: GameService,
  ) {}

  ngOnInit(): void {
    this.checkIfLogged();
    this.getUser();
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
}
