import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../services/app-confirm/app-confirm.service';
import { service } from '../services/service';
import { UserDetailComponent } from './user-detail/user-detail.component';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['../app.component.css']
})
export class ManageUserComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private env: service,
    private confirmService: AppConfirmService,
    private _snackBar: MatSnackBar
  ) { }


  userdata: any;
  displayedColumns: string[] = ['NO', 'name', 'email', 'role', 'manage'];

  ngOnInit(): void {
    this.selectData()
  }

  selectData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.get(this.env.URL + 'users', { headers }).subscribe((data: any) => {
      this.userdata = [...data]
    })
  }

  delete(id: any) {
    this.confirmService.confirm({
      title: 'confirm',
      message: 'ยืนยันลบ Project ?',
      width: '250px',
    }).subscribe(async (res: any) => {
      // console.log(res)
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      if (res) {
        this.http.delete(this.env.URL + 'users/' + id, { headers }).subscribe((data: any) => {
          this._snackBar.open("ลบสำเร็จ", 'OK', {
            duration: 2000
          });
          this.selectData()
        }, (e) => {
          this._snackBar.open("ลบไม่สำเร็จ", 'OK', {
            duration: 2000
          });
        })
      }
    })
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(UserDetailComponent, {
      data: { id },
      width: '100%',
      height: '60%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.selectData()
    });

  }
}

