import { Component } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { Router } from '@angular/router';
import { Game } from '../game';
import { trigger, transition, style, animate } from '@angular/animations';
import { Present } from '../present';


@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.css'],
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
export class UserLibraryComponent {
  user: User | undefined;
  userLibrary: Game[] = [];
  recievedGames: Game[] = [];
  sentGames: Game[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.checkIfLogged();
    this.getUser();
    this.getUserLibrary();
    this.getRecievedGames();
    this.getSentGames();
  }

  getUser(): void {
    this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  getUserLibrary(): void {
    this.userService.getUserLibrary()
      .subscribe(library => this.userLibrary = library);
  }

  getRecievedGames(): void {
    this.userService.getRecievedGames().subscribe(games => this.recievedGames = games);
  }

  getSentGames(): void {
    this.userService.getSentGames().subscribe(games => this.sentGames = games);
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
