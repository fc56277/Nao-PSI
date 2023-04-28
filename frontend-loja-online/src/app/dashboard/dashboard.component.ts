import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game';
import { User } from '../user';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  users: User[] = [];
  destaqueGames: Game[] = [];
  allGames: Game[] = [];

  constructor(
    private userService: UserService, 
    private gameService: GameService,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.getEmDestaqueGames();
    this.getAllGames();
  }

  getAllGames(): void {
    this.gameService.getGames()
      .subscribe(games => this.allGames = games)
  }

  getEmDestaqueGames(): void {
    this.gameService.getGames()
      .subscribe(games => this.destaqueGames = games.slice(0,3));
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
