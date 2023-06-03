import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
import { service } from "../../services/service";

@Component({
  selector: 'app-expense-detail',
  templateUrl: './expense-detail.component.html',
  styleUrls: ['./expense-detail.component.css']
})
export class ExpenseDetailComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ExpenseDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe,
    private confirmService: AppConfirmService,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private service: service,

  ) { }

  dataexpense: any = {
    expense_detail: null,
    expense_value: null,
    expense_date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    expense_group: null,
    project: null
  }

  dataproject:any = []

  ngOnInit(): void {
    console.log('id',this.data.id)
    if (this.data.id) {
      console.log('edit')
      this.selectdata()
    } else {
      console.log('add')
    }
    this.selectdataproject()
  }

  selectdataproject(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.get(this.service.URL + 'projects', { headers }).subscribe(async (data: any) => {
      this.dataproject = data
    })
  }

  selectdata() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.get(this.service.URL + 'expenses/' + this.data.id, { headers }).subscribe(async (data: any) => {
      this.dataexpense.expense_detail = data.expense_detail
      this.dataexpense.expense_value = data.expense_value
      this.dataexpense.expense_date = this.datepipe.transform(data.expense_date, 'yyyy-MM-dd')
      this.dataexpense.expense_group = data.expense_group
      this.dataexpense.project = data.project

    })
  }

  savedata() {
    this.confirmService.confirm({
      title: 'confirm',
      message: 'บันทึก ค่าใช้จ่าย?',
      width: '250px',
    }).subscribe(async (res: any) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      if (res) {
        if (this.data.id) {
          this.http.put(this.service.URL + 'expenses/'+this.data.id, {
            _id:this.data.id,
            expense_detail: this.dataexpense.expense_detail,
            expense_value: this.dataexpense.expense_value,
            expense_date: this.dataexpense.expense_date,
            expense_group: this.dataexpense.expense_group,
            project: this.dataexpense.project,
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
          this.http.post(this.service.URL + 'expenses', {
            expense_detail: this.dataexpense.expense_detail,
            expense_value: this.dataexpense.expense_value,
            expense_date: this.dataexpense.expense_date,
            expense_group: this.dataexpense.expense_group,
            project: this.dataexpense.project,
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
