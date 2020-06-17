import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public showPassword: boolean;
  public username: string;
  public password: string;

  constructor(private readonly authService: AuthService) {
    this.showPassword = true;
  }

  ngOnInit(): void {
  }

  public login() {
    this.authService.login(this.username, this.password).subscribe();
  }
}
