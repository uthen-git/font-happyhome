import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { QuoDetailComponent } from './quo-detail/quo-detail.component';
import { MatDialog } from '@angular/material/dialog';
import { service } from "../services/service";
import { AppConfirmService } from '../services/app-confirm/app-confirm.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['../app.component.css']
})
export class QuotationComponent implements OnInit{
  quotationdata: any;
  displayedColumns: string[] = ['NO','quotation_code', 'quotation_date', 'customer_name','total','manage'];

  constructor(

    private http: HttpClient,
    public dialog: MatDialog,
    private service: service,
    private confirmService: AppConfirmService,
    private _snackBar: MatSnackBar,
    ) {
    }

  ngOnInit(): void {
    this.selectData()
  }

  selectData(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.get(this.service.URL+'quotations',{headers}).subscribe((data: any) => {
      this.quotationdata = data
    })
  }

  openDialog(id:any): void {
    const dialogRef = this.dialog.open(QuoDetailComponent, {
      data: {id},
      width:'100%',
      height:'100%',
      disableClose:true
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      this.selectData()
    });

  }

  delete(id:any){
    this.confirmService.confirm({
      title: 'confirm',
      message: 'ยืนยันลบใบเสนอราคา?',
      width: '250px',
    }).subscribe(async (res: any) => {
      // console.log(res)
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      if (res) {
        this.http.delete(this.service.URL+'quotations/'+id,{headers}).subscribe((data: any) => {
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

  generatePDF() {
    pdfMake.createPdf({ content: 'Hello, PDF!' }).open();
  }

  print() {
    Swal.fire({
      title: 'เลือกเอกสาร',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'ใบเสนอราคา',
      denyButtonText: `สัญญาสั่งสร้าง`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.generatePDF()
      } else if (result.isDenied) {

      }
    })
  }

}
