import { Component, Inject, OnInit } from '@angular/core';
import { service } from "../../services/service";
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ProjectDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe,
    private confirmService: AppConfirmService,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private service: service,

  ) { }

  dataproject: any = {
    project_name: null,
    project_start_date: null,
    project_value: null,
    project_status: null
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
      'Content-Type': 'application/json'
    });
    this.http.get(this.service.URL + 'projects/' + this.data.id, { headers }).subscribe(async (data: any) => {
      this.dataproject.project_name = data.project_name
      this.dataproject.project_start_date = this.datepipe.transform(data.project_start_date, 'yyyy-MM-dd')
      this.dataproject.project_value = data.project_value
      this.dataproject.project_status = data.project_status
    })
  }

  savedata() {
    this.confirmService.confirm({
      title: 'confirm',
      message: 'บันทึก Project?',
      width: '250px',
    }).subscribe(async (res: any) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      if (res) {
        if (this.data.id) {
          this.http.put(this.service.URL + 'projects/'+this.data.id, {
            _id:this.data.id,
            project_name: this.dataproject.project_name,
            project_start_date: this.dataproject.project_start_date,
            project_value: this.dataproject.project_value,
            project_status: this.dataproject.project_status,
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
        } else {
          this.http.post(this.service.URL + 'projects', {
            project_name: this.dataproject.project_name,
            project_start_date: this.dataproject.project_start_date,
            project_value: this.dataproject.project_value,
            project_status: this.dataproject.project_status,
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
      }
    })
  }
}
