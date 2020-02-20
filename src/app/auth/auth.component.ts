import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  public showPassword: boolean;

  constructor() {
    this.showPassword = true;
  }

  ngOnInit(): void {
  }

}
