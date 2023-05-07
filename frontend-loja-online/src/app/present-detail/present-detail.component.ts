import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Present } from '../present';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { GameService } from '../game.service';
import { Game } from '../game';

@Component({
  selector: 'app-present-detail',
  templateUrl: './present-detail.component.html',
  styleUrls: ['./present-detail.component.css'],
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
export class PresentDetailComponent {
  present: Present | undefined;
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
    this.getPresent();
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

  getPresent(): void {
    const id = this.route.snapshot.params['id'];
    this.userService.getSentPresent(id).subscribe(present => this.present = present);
  }

  getGame(): void {
    const id = this.route.snapshot.params['id'];
    this.gameService.getGameById(id).subscribe(game => this.game = game);
  }

  deletePresent(): void{
    if(this.present)
      this.userService.deletePresent(this.present?._id).subscribe(
        (response) => {
          alert(response.message);
          this.router.navigate(['/biblioteca']);
        }
      )
  }

}
