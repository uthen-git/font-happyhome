import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import Swal from 'sweetalert2';
import { service } from "../../services/service";

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

    this.jwtAuth.signin(this.userdata.email, this.userdata.password)
      .subscribe(response => {
        console.log(response.status)
        this.router.navigateByUrl(this.jwtAuth.return);
        Swal.fire({
          icon: 'success',
          title: 'success!',
          text: 'เข้าสู่ระบบสำเร็จ',
          timer: 2000,
          timerProgressBar: true,
        })
      }, (e) => {
        console.log(e.status)
        if (e.status == 400) {
          Swal.fire({
            icon: 'error',
            title: 'รหัสผ่านไม่ถูกต้อง!',
            allowOutsideClick: false
          })
        } else if (e.status == 501) {
          Swal.fire({
            icon: 'error',
            title: 'ไม่มีสิทธ์เข้าใช้งาน!',
            allowOutsideClick: false
          })
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถเข้าสู่ระบบได้!',
            allowOutsideClick: false
          })
        }

      })
  }
}
