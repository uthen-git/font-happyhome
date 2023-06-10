import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { service } from "../../services/service";
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private service: service,
    private router: Router,
    private jwtAuth: JwtAuthService,
  ) { }

  userdata :any = {
    email:"uthendevelop@gmail.com",
    password:"1234"
  }

  signin() {
    console.log(this.userdata.email,this.userdata.password)
    // this.router.navigate(['/home']);

    this.jwtAuth.signin(this.userdata.email,this.userdata.password)
    .subscribe(response => {
      this.router.navigateByUrl(this.jwtAuth.return);
    })
  }
}
