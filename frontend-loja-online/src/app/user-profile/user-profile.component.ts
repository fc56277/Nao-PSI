import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../user';
import { UserService } from "../user.service"
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Game } from '../game';
import { GameService } from '../game.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;
  showGames: boolean = false;
  allGames: Game[] = [];
  @ViewChild('gamesSection') gamesSection!: ElementRef;

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
    this.toggleGames();
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  toggleGames() {
    this.showGames = !this.showGames;
    return this.showGames;
  }

  getAllGames(): void {
    this.gameService.getGames()
      .subscribe(games => this.allGames = games)
  }

  scrollToGames() {
    this.gamesSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
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