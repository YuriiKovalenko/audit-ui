import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';
import { User } from '../core/auth/user.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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
    window['test'] = this;
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
