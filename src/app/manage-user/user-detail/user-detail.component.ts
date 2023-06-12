import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProjectDetailComponent } from 'src/app/project/project-detail/project-detail.component';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
import { JwtAuthService } from 'src/app/services/auth/jwt-auth.service';
import { service } from 'src/app/services/service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<ProjectDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe,
    private confirmService: AppConfirmService,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private env: service,
    private jwtAuth: JwtAuthService,


  ) { }
  datauser: any = {
    first_name: null,
    last_name: null,
    email: null,
    role: null,
    token:null,
  }

  ngOnInit(): void {
    if (this.data.id) {
      console.log('edit')
      this.selectdata()
    } else {
      console.log('add')
    }
  }

  selectdata() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.jwtAuth.getJwtToken()
    });
    this.http.get(this.env.URL + 'users/' + this.data.id, { headers }).subscribe(async (data: any) => {
      this.datauser.first_name = data.first_name
      this.datauser.last_name = data.last_name
      this.datauser.email = data.email
      this.datauser.password = data.password
      this.datauser.role = data.role
      this.datauser.token = data.token
    })
  }

  savedata() {
    this.confirmService.confirm({
      title: 'confirm',
      message: 'บันทึก ผู้ใช้?',
      width: '250px',
    }).subscribe(async (res: any) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.jwtAuth.getJwtToken()
      });
      if (res) {
          this.http.put(this.env.URL + 'users/'+this.data.id, {
            _id:this.data.id,
            first_name: this.datauser.first_name,
            last_name: this.datauser.last_name,
            email: this.datauser.email,
            password: this.datauser.password,
            role:this.datauser.role,
            token:this.datauser.token,
          }, { headers }).subscribe(async (data: any) => {
            await this._snackBar.open("บันทึกสำเร็จ", 'OK', {
              duration: 2000
            });
            await this.dialogRef.close(true)
          }, (e) => {
            this._snackBar.open("บันทึกไม่สำเร็จ", 'OK', {
              duration: 2000
            }); this.dialogRef.close(false)
          })

      }
    })
  }
}
