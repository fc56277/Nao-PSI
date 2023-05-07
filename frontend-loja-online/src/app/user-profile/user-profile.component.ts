import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../user';
import { UserService } from "../user.service"
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Game } from '../game';
import { GameService } from '../game.service';
import { trigger, transition, style, animate } from '@angular/animations';


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
  editedUsername: string = '';

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

  updateUsername(): void {
    const newUsername = this.user!.name.trim();
    const alphanumeric = /^[a-zA-Z0-9]+$/;
  
    let errorMessage = '';
  
    if (newUsername === '') {
      errorMessage += '\n- Username não pode ser vazio.';
    }
  
    if (newUsername.length < 3) {
      errorMessage += '\n- O nome de Utilizador deve ter pelo menos três carateres.';
    }
  
    if (!alphanumeric.test(newUsername)) {
      errorMessage += '\n- O nome de Utilizador deve ser alfanumérico.';
    }
  
    if (errorMessage) {
      alert(errorMessage);
      return;
    }
  
    this.userService.updateUsername(this.user!._id, newUsername)
      .subscribe(
        (response) => {
          alert('Username foi atualizado com sucesso.');
        },
        (error) => {
          if (error.error && error.error.message) {
            alert(error.error.message);
          } else {
            alert('Erro ao atualizar o Utilizador.');
          }
        }
      );
  }  
}