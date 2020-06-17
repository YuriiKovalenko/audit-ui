import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(): Observable<boolean> {
    return this.authService
      .getCurrentUser()
      .pipe(pluck('roles'), map((roles) => !!roles.find((role) => role.name === 'user')));
  }
}
