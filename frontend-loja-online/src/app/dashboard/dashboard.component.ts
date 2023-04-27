import { Component } from '@angular/core';
import { GameService } from '../game.service';
import { Game } from '../game';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  games: Game[] = [];

  constructor(private gameService: GameService) { }

  getEmDestaqueGames(): void {
    this.gameService.getGames()
      .subscribe(games => this.games = games.slice(1,4));
  }
}
