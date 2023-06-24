import { Component, OnInit } from '@angular/core';
import { JwtAuthService } from '../../auth/jwt-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css'],
})
export class AdminLayoutComponent implements OnInit {
  constructor(private jwtAuth: JwtAuthService) {
    this.jwtAuth.checkTokenIsValid().subscribe((res) => {
      this.userdata = res;
      this.expiredate = 99;
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

  expiredate:number = 0;

  ngOnInit(): void {}
  signout() {
    Swal.fire({
      title: 'ต้องการออกจากระบบใช่หรือไม่',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'ยืนยัน',
      denyButtonText: `ยกเลิก`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.jwtAuth.signout();
      } else if (result.isDenied) {
      }
    });
  }
}
