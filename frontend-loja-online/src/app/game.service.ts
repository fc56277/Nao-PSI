import { Injectable } from '@angular/core';
import { Game } from './game';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>('http://localhost:3000/games').pipe(
      catchError(this.handleError<Game[]>('getGames', [])));
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

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
searchGames(term: string): Observable<Game[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Game[]>(`${this.gameUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       console.error(`found games matching "${term}"`) :
       console.error(`no games matching "${term}"`)),
    catchError(this.handleError<Game[]>('searchItems', []))
  );
}


}
