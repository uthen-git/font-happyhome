import { Component } from '@angular/core';
import { JwtAuthService } from '../../auth/jwt-auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  constructor(
    private jwtAuth: JwtAuthService,

  ) {
    this.jwtAuth.checkTokenIsValid().subscribe();
  }

  signout(){
    this.jwtAuth.signout()
  }
}
