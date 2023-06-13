import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { LocalStoreService } from 'src/app/services/local-store.service';
import { service } from "../../services/service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: service,

  ) { }

  userdata: any = {
    first_name: null,
    last_name: null,
    email: null,
    password: null
  }

  signup() {
    Swal.fire({
      title: 'ยืนยันส่งคำขอ',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'ยืนยัน',
      denyButtonText: `ยกเลิก`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.http.post(this.service.URL + 'users/register',
        {
          first_name: this.userdata.first_name,
          last_name: this.userdata.last_name,
          email: this.userdata.email,
          password: this.userdata.password
        }).subscribe((data: any) => {
          Swal.fire('ส่งคำขอสำเร็จ', '', 'success')
        }), ((error: any) => {
          Swal.fire('ส่งคำขอไม่สำเร็จกรุณาติดต่อ admin', '', 'error')
        })
      } else if (result.isDenied) {

      }
    })

  }
}
