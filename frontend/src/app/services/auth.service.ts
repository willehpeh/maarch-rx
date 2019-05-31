import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth$ = new BehaviorSubject<boolean>(false);
  private token: string;
  private currentUser: string;

  constructor(private http: HttpClient,
              private config: Config) {}

  getIsAuth() {
    return this.isAuth$.asObservable();
  }

  getToken() {
    return this.token || null;
  }

  getCurrentUser() {
    return this.currentUser || null;
  }

  login(email: string, password: string) {
    return this.http.post<{token: string, userId: string}>(`${this.config.apiUrl}/user/login`, { email, password }).pipe(
      tap(data => {
        this.token = data.token;
        this.currentUser = data.userId;
        this.isAuth$.next(true);
      })
    );
  }

  signup(email: string, password: string) {
    return this.http.post<{token: string, userId: string}>(`${this.config.apiUrl}/user/signup`, { email, password }).pipe(
      switchMap(() => this.login(email, password))
    );
  }

  logout() {
    this.token = null;
    this.currentUser = null;
    this.isAuth$.next(false);
    return of({});
  }
}
