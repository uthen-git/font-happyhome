import { Component } from '@angular/core';
import { JwtAuthService } from '../../auth/jwt-auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {
  constructor(
    private jwtAuth: JwtAuthService,
  ) {
    this.jwtAuth.checkTokenIsValid().subscribe(res => {
      this.userdata.username = res.first_name+' '+res.last_name
    });
  }

  userdata: any = {
    username: null
  }
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
        this.jwtAuth.signout()
      } else if (result.isDenied) {

      }
    })
  }
}
