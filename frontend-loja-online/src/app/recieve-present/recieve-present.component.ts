import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Game } from '../game';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-recieve-present',
  templateUrl: './recieve-present.component.html',
  styleUrls: ['./recieve-present.component.css'],
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
export class RecievePresentComponent {
  game: Game | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService, 
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkIfLogged();
    this.getGame();
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

  getGame(): void {
    const id = this.route.snapshot.params['id'];
    this.gameService.getGameById(id).subscribe(game => this.game = game);
  }

  confirm(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.confirmPresent(id).subscribe((response) => {
      alert(response.message);
      // Redirect to login page
      this.router.navigate(['/biblioteca']);
    })
  }

  decline(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.declinePresent(id).subscribe((response) => {
      alert(response.message);
      // Redirect to login page
      this.router.navigate(['/biblioteca']);
    })
  }
}
