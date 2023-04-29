import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from "../user.service"
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { Game } from '../game';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  allGames: Game[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private gameService: GameService,
    private location: Location,
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