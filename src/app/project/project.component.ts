import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../services/app-confirm/app-confirm.service';
import { service } from "../services/service";
import { ProjectDetailComponent } from "./project-detail/project-detail.component";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['../app.component.css']
})
export class ProjectComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private service: service,
    private confirmService: AppConfirmService,
    private _snackBar: MatSnackBar
  ) { }

  projectdata: any;
  displayedColumns: string[] = ['NO', 'project_name', 'project_start_date', 'project_value', 'project_status', 'manage'];

  ngOnInit(): void {
    this.selectData()
  }

  selectData() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.get(this.service.URL + 'projects', { headers }).subscribe((data: any) => {
      this.projectdata = data
    })
  }

  delete(id:any){
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
        this.http.delete(this.service.URL+'projects/'+id,{headers}).subscribe((data: any) => {
          this._snackBar.open("ลบสำเร็จ",'OK',{
            duration: 2000
          });
          this.selectData()
        },(e)=>{this._snackBar.open("ลบไม่สำเร็จ",'OK',{
          duration: 2000
        });})
      }
    })
  }

  openDialog(id:any): void {
    const dialogRef = this.dialog.open(ProjectDetailComponent, {
      data: {id},
      width:'100%',
      height: '60%',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.selectData()
    });

  }
}
