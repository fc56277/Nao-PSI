import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../user';
import { UserService } from "../user.service"
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Game } from '../game';
import { GameService } from '../game.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
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

  async saveUsername(): Promise<void> {
    if (this.user) {
      const trimmedUsername = this.user.name.trim();
      const errorMessage = await this.validateUsername(this.user._id, trimmedUsername);
  
      if (errorMessage) {
        alert(errorMessage);
        return;
      }
  
      this.userService.updateUser(this.user)
        .subscribe(() => {
          alert('Username foi atualizado com sucesso.');
        });
    }
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

  async validateUsername(userId: string, username: string): Promise<string> {
    const alphanumeric = /^[a-zA-Z0-9]+$/;
    let errorMessage = '';
  
    if (username === '') {
      errorMessage += '\n- Username não pode ser vazio.';
    }
  
    if (username.length < 3) {
      errorMessage += '\n- O nome de Utilizador deve ter pelo menos três carateres.';
    }
  
    if (!alphanumeric.test(username)) {
      errorMessage += '\n- O nome de Utilizador deve ser alfanumérico.';
    }
  
    if (errorMessage) {
      return errorMessage;
    }
  
    const usernameExists = await this.userService.checkUsernameExists(username, userId).toPromise();
    if (usernameExists) {
      errorMessage += '\n- Este username não está disponível.';
    }
  
    return errorMessage;
  }  
}