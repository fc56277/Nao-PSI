import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from "./user";
import { catchError, tap } from 'rxjs/operators';
import { Game } from './game';
import { Present } from './present';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }
  
  private usersUrl = 'api/users'; 
  // private usersUrl = 'http://appserver.alunos.di.fc.ul.pt:3067';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserById(id: string) {
    const url = `${this.usersUrl}/profile/${id}`;
      
      return this.http.get<User>(url).pipe(
        tap(_ => console.error(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }

  getFollowingUsers() {
    const url = `${this.usersUrl}/following`;
    return this.http.get<User[]>(url);
  }

  getUserLibrary(): Observable<Game[]> {
    const url = `${this.usersUrl}/library`;
    return this.http.get<Game[]>(url);
  }

  getUserWishlist(): Observable<Game[]> {
    const url = `${this.usersUrl}/wishlist`;
    return this.http.get<Game[]>(url);
  }  

  getUser(): Observable<User> {
    const url = `${'api/user'}`;
    return this.http.get<User>(url);
  }

  incCart(): Observable<User> {
    const url = `${this.usersUrl}/incCart`
    return this.http.put<any>(url, {})
      .pipe(
        tap(_ => console.log('User registration successful')),
        catchError(this.handleError<any>('registerUser'))
      );
  }

  registerUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/register`;
    return this.http.post<User>(url, user)
      .pipe(
        tap(_ => console.log('User registration successful')),
        catchError(this.handleError<any>('registerUser'))
      );
  }

  loginUser(id: string): Observable<{ message: string }> {
    const url = `${this.usersUrl}/login/${id}`;
    return this.http.get<{ message: string }>(url);
  }  

  checkIfLogged(): Observable<{ value: boolean }> {
    const url = `${this.usersUrl}/login`;
    return this.http.get<{ value: boolean }>(url);
  }  

  logOutUser(): Observable<{ message: string }> {
    const url = `${this.usersUrl}/logout`;
    return this.http.get<{ message: string }>(url);
  }  

  sendGame(reciever: string, game: Game): Observable<{ message: string }> {
    const url = `${this.usersUrl}/sendGame`;
    return this.http.put<{ message: string }>(url, [reciever, game]);
  }

  getSentGames(): Observable<Game[]> {
    const url = `${this.usersUrl}/sentGames`;
    return this.http.get<Game[]>(url);
  }

  getRecievedGames(): Observable<Game[]> {
    const url = `${this.usersUrl}/recievedGames`;
    return this.http.get<Game[]>(url);
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
  
      // TODO: Replace this with your own error handling logic
      return throwError(error);
    };
  }

  searchUsers(name: string): Observable<User[]> {
    if (!name.trim()) {
      return of([]);
    }

    const url = `api/users/${name}`;

    return this.http.get<User[]>(url).pipe(
      tap(x => x.length ?
        console.log(`found user matching "${name}"`) :
        console.error(`no user matching "${name}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user._id}`;
    return this.http.put<User>(url, user).pipe(
      tap(_ => console.log(`user with id=${user._id} updated`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  confirmPresent(id: string):Observable<{ message: string }>  {
    const url = `${this.usersUrl}/confirmPresent`;
    return this.http.put<{ message: string }>(url, {id});
  }

  declinePresent(id: string):Observable<{ message: string }>  {
    const url = `${this.usersUrl}/declinePresent`;
    return this.http.put<{ message: string }>(url, {id});
  }

  getSentPresent(id:string):Observable<Present> {
    const url = `${this.usersUrl}/getSentPresent/${id}`;
    return this.http.get<Present>(url);
  }

  deletePresent(id: string):Observable<{ message: string }>  {
    const url = `${this.usersUrl}/deletePresent/${id}`;
    return this.http.delete<{ message: string }>(url);
  }

  checkUsernameExists(username: string, id: string): Observable<boolean> {
    const url = `${this.usersUrl}/check-username-exists/${username}/${id}`;
    return this.http.get<boolean>(url).pipe(
      catchError(this.handleError<boolean>('checkUsernameExists'))
    );
  }  
}