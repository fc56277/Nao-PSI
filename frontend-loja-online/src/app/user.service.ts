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
  
  private mainUrl = 'api'
  private usersUrl = 'api/users'; 

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  /** GET hero by _id. Will 404 if _id not found */
  getUser(_id: string): Observable<User> {
    const url = `${'http://localhost:3000/user'}/${_id}`;
    return this.http.get<User>(url);
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

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
  
      // TODO: Replace this with your own error handling logic
      return throwError(error);
    };
  }
}