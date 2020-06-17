import { of, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl: string;
  private currentUser: User;
  private userChanges: Subject<User>;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    this.apiUrl = '/auth';
    this.userChanges = new Subject();
  }

  public login(username: string, password: string) {
    return this.http
      .post<{ accessToken: string }>(
        `${this.apiUrl}/login`,
        { username, password },
        { headers: { Authorization: 'No auth' } }
      )
      .pipe(
        tap((response) => this.setToken(response.accessToken)),
        tap(() => this.router.navigate(['/']))
      );
  }

  public getCurrentUser() {
    return this.currentUser
      ? of(this.currentUser)
      : this.http.get<User>(`${this.apiUrl}/validate`).pipe(
          tap((user) => {
            this.currentUser = user;
            this.userChanges.next(user);
          })
        );
  }

  public getUserChanges() {
    return this.userChanges.asObservable();
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  private setToken(value: string) {
    localStorage.setItem('token', value);
  }

  public unauthorize() {
    localStorage.removeItem('token');
    this.currentUser = null;
    this.userChanges.next(null);
    this.router.navigate(['/auth']);
  }
}
