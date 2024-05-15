import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import {IUser, IUserCredentials} from "./User.module";



@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject: BehaviorSubject<IUser | null>;
  public currentUser: Observable<IUser | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<IUser | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public login(credentials: IUserCredentials): Observable<IUser> {
    return this.http.post<IUser>('/api/login', credentials).pipe(
      map(user => {
        this.currentUserSubject.next(user); // Update the observable with the new user data
        return user;
      }),
      catchError(error => {
        console.error('Login failed:', error);
        this.currentUserSubject.next(null); // Clear user data on error
        throw error;
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null); // Clear the user data and update the observable
  }

  getUserInfo(): IUser | null {
    return this.currentUserSubject.value;
  }

}
