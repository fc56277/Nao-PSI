import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { User } from '../user';
import { UserService } from "../user.service"
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Game } from '../game';
import { GameService } from '../game.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
  showImageOptions: boolean = false;

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

  saveUsername(): void {
    if (this.user) {
      const trimmedUsername = this.user.name.trim();
      this.validateUsername(this.user._id, trimmedUsername).subscribe(errorMessage => {
        if (errorMessage) {
          alert(errorMessage);
          return;
        }
    
        // Check if this.user is not undefined before passing it to updateUser
        if (this.user) {
          this.userService.updateUser(this.user)
            .subscribe(() => {
              alert('O nome de utilizador foi atualizado com sucesso.');
            });
        } else {
          // Handle the case where this.user is undefined
          console.error('User is undefined');
        }
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

  validateUsername(userId: string, username: string): Observable<string> {
    const alphanumeric = /^[a-zA-Z0-9]+$/;
    let errorMessage = '';
  
    if (username === '') {
      errorMessage += '\n- O nome de utilizador não pode estar vazio.';
    }
  
    if (username.length < 3) {
      errorMessage += '\n- O nome de utilizador deve ter pelo menos três caracteres.';
    }
  
    if (!alphanumeric.test(username)) {
      errorMessage += '\n- O nome de utilizador deve ser alfanumérico.';
    }
  
    if (errorMessage) {
      return of(errorMessage);
    }
  
    return this.userService.checkUsernameExists(username, userId).pipe(
      map((usernameExists: any) => {
        if (usernameExists) {
          errorMessage += '\n- Este nome de utilizador não está disponível.';
        }
        return errorMessage;
      })
    );
  }

  toggleImageOptions(): void {
    this.showImageOptions = !this.showImageOptions;
  }

  chooseImage(imageUrl: string): void {
    if (this.user) {
      this.user.imagemPerfil = imageUrl;
      this.userService.updateUser(this.user).subscribe(() => {
        alert('Imagem de perfil atualizada com sucesso.');
      });
    }
    this.showImageOptions = false;
  }
}