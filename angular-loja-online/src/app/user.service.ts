import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { User } from "./user";
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }
  
  private usersUrl = 'api/users'; 

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  registerUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/register`;
    return this.http.post<User>(url, user)
      .pipe(
        tap(_ => console.log('User registration successful')),
        catchError(this.handleError<any>('registerUser'))
      );
  }
  
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
  
      // TODO: Replace this with your own error handling logic
      return throwError(error);
    };
  }
}
