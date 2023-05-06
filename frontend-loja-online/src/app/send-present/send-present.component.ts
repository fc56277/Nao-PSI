import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Game } from '../game';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../game.service';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-send-present',
  templateUrl: './send-present.component.html',
  styleUrls: ['./send-present.component.css'],
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
export class SendPresentComponent {
  game: Game | undefined;
  users: User[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService, 
    private gameService: GameService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.checkIfLogged();
    this.getGame();
    this.getUsers();
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

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }

  confirm(user: string): void {
    var found = false;
    if(this.users != undefined && this.game != undefined) {
      for(var i = 0; i < this.users.length; i++) {
        if(this.users[i].name === user) {
          found = true;
          this.userService.sendGame(this.users[i]._id, this.game).subscribe(
            (response) => {
              console.log("aqui");
              alert(response.message);
              this.router.navigate([`/detail/${this.game?._id}`]);
            }
          );
          break;
        }
      }
      if(!found) {
        alert("O utilizador selecionado não existe!");
      }
    }
  }

}
