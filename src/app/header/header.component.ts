import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { User } from '../core/auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  public currentUser: User;
  private userSubscription: Subscription;
  public currentUrl: string;

  constructor(
    private readonly authService: AuthService,
    public readonly router: Router
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.getUserChanges().subscribe(
      (user) =>
        (this.currentUser = user && {
          ...user,
          isAdmin: !!user?.roles?.find((role) => role.name === 'admin'),
        })
    );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  public goAudit() {
    this.router.navigate(['audit']);
  }

  public goSetup() {
    this.router.navigate(['rules']);
  }

  public signOut() {
    this.authService.unauthorize();
  }
}
