import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { AppConfirmService } from '../services/app-confirm/app-confirm.service';
import { service } from "../services/service";
import { ExpenseDetailComponent } from "./expense-detail/expense-detail.component";


@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['../app.component.css']
})
export class ExpenseComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private service: service,
    private confirmService: AppConfirmService,
    private _snackBar: MatSnackBar
  ) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  dataSource!: MatTableDataSource<any>
  expensedata: any;
  displayedColumns: string[] = ['NO', 'expense_detail', 'expense_value', 'expense_date', 'expense_group', 'project', 'manage'];

  dataproject: any = []

  dataquery: any = {
    year: null,
    month: null,
    project: null
  }


  ngOnInit(): void {
    this.selectData()
    this.selectdataproject()
  }
  selectdataproject() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.get(this.service.URL + 'projects', { headers }).subscribe(async (data: any) => {
      this.dataproject = data
    })
  }
  selectData() {
    // Swal.showLoading()
    this.expensedata = []
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.get(this.service.URL + (this.dataquery.year && this.dataquery.month ? ('expenses/' + this.dataquery.year + '/' + this.dataquery.month) : 'expenses'), { headers }).subscribe((data: any) => {
      data.forEach(async (element: any, i: any) => {
            await this.expensedata.push({
              _id: element._id,
              expense_detail: element.expense_detail,
              expense_value: element.expense_value,
              expense_date: element.expense_date,
              expense_group: element.expense_group,
              project:element.project?this.dataproject.filter((pj:any) => pj._id == element.project)[0].project_name:null
            })
            this.expensedata = await [...this.expensedata];
        if (data.length == i+1) {
          this.dataSource = new MatTableDataSource([...this.expensedata]);
          this.dataSource.paginator = this.paginator;
          this.paginator.pageSize = 5;
        }
      });
    })
  }

  openDialog(id: any): void {
    console.log(id)
    const dialogRef = this.dialog.open(ExpenseDetailComponent, {
      data: { id },
      width: '100%',
      height: '70%',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.selectData()
    });

  }

  delete(id: any) {
    this.confirmService.confirm({
      title: 'confirm',
      message: 'ยืนยันลบ ค่าใช้จ่าย ?',
      width: '250px',
    }).subscribe(async (res: any) => {
      // console.log(res)
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      if (res) {
        this.http.delete(this.service.URL + 'expenses/' + id, { headers }).subscribe((data: any) => {
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
}
