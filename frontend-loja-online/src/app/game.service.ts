import { Injectable } from '@angular/core';
import { Game } from './game';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameUrl = 'http://appserver.alunos.di.fc.ul.pt:3067';

  constructor(private http: HttpClient) { }

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    getGames(): Observable<Game[]> {
      return this.http.get<Game[]>('http://appserver.alunos.di.fc.ul.pt:3067/games').pipe(
        catchError(this.handleError<Game[]>('getGames', [])));
    }

    getRecievedGames():Observable<Game[]> {
      return this.http.get<Game[]>('http://appserver.alunos.di.fc.ul.pt:3067/recievedGames').pipe(
        catchError(this.handleError<Game[]>('getRecievedGames', [])));
    }
      /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

/* GET games whose name contains search term */
  searchGames(name: string): Observable<Game[]> {
    if (!name.trim()) {
      return of([]);
    }

    const url = `http://appserver.alunos.di.fc.ul.pt:3067/games/${name}`;

    return this.http.get<Game[]>(url).pipe(
      tap(x => x.length ?
        console.log(`found games matching "${name}"`) :
        console.error(`no games matching "${name}"`)),
      catchError(this.handleError<Game[]>('searchItems', []))
    );
  }

  getGameById(id: string) {
    const url = `${this.gameUrl}/detail/${id}`;
      
      return this.http.get<Game>(url).pipe(
        tap(_ => console.log(`fetched game id=${id}`)),
        catchError(this.handleError<Game>(`getGame id=${id}`))
      );
  }

  classify(game: Game, classification: number): Observable<Game> {
      const url = `${this.gameUrl}/classify/${classification}`;
      
      return this.http.put<Game>(url,  game).pipe(
        tap(_ => console.log(`${classification} stars classification given`)),
        catchError(this.handleError<Game>(`error classifying with ${classification} stars`))
      );
  }


}
