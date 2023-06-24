import { Component } from '@angular/core';
import { JwtAuthService } from '../services/auth/jwt-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  constructor(private jwtAuth: JwtAuthService) {
    this.jwtAuth.checkTokenIsValid().subscribe((res) => {
      this.userdata = res;
    });
  }
  userdata?: any = {
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    role: null,
    __v: null,
    _id: null,
  };
}
