import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { service } from "../../services/service";
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import Swal from 'sweetalert2';

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

  userdata: any = {
    email: null,
    password: null
  }

  signin() {
    Swal.showLoading()
    // Swal.fire('Hello SweetAlert2!');
    // console.log(this.userdata.email, this.userdata.password)
    // this.router.navigate(['/home']);

    this.jwtAuth.signin(this.userdata.email, this.userdata.password)
      .subscribe(response => {
        this.router.navigateByUrl(this.jwtAuth.return);
        Swal.fire({
          icon: 'success',
          title: 'success!',
          text: 'เข้าสู่ระบบสำเร็จ',
          timer: 2000,
          timerProgressBar: true,
        })
      }, () => {
        Swal.fire({
          icon: 'error',
          title: 'รหัสผ่านไม่ถูกต้อง!',
          allowOutsideClick: false

          // text: 'รหัสผ่านไม่ถูกต้อง',
        })
      })
  }
}
