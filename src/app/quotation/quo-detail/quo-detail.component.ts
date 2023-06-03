import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
import { service } from "./../../services/service";

@Component({
  selector: 'app-quo-detail',
  templateUrl: './quo-detail.component.html',
  styleUrls: ['./quo-detail.component.css']
})
export class QuoDetailComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<QuoDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe,
    private confirmService: AppConfirmService,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private service: service,

  ) { }


  data_doc: any = {
    doc_no: null,
    doc_date: this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
    customer_name: null,
    customer_address: null,
    doc_detail: null,
  }

  data_price: any = {
    sum: 0,
    discount: 0,
    vat: 0,
    total: 0,
    deposit: 0
  }

  lessonprice: any = {
    lesson1: 0,
    lesson2: 0,
    lesson3: 0,
    lesson1percent: 40,
    lesson2percent: 40,
    lesson3percent: 20
  }

  lessondata: any = [{
    detail: null,
    quantity: 0,
    price_per_unit: 0,
    sum_price: 0
  }]

  instantpayment: any = [{
    detail: null,
    quantity: 0,
    price_per_unit: 0,
    sum_price: 0
  }]

  imageSrc: string = '';
  sum_inst = 0

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
    this.http.get(this.service.URL + 'quotations/' + this.data.id, { headers }).subscribe(async (data: any) => {

      this.lessondata = []
      this.instantpayment = []

      this.data_doc.doc_no = data.quotation_code
      this.data_doc.doc_date = this.datepipe.transform(data.quotation_date, 'yyyy-MM-dd')
      this.data_doc.customer_name = data.customer_name
      this.data_doc.customer_address = data.customer_address
      this.data_doc.doc_detail = data.quotation_detail

      this.data_price.sum = data.sum
      this.data_price.discount = data.discount
      this.data_price.vat = data.vat
      this.data_price.total = data.total
      this.data_price.deposit = data.deposit

      this.lessonprice.lesson1 = data.lesson1price
      this.lessonprice.lesson2 = data.lesson2price
      this.lessonprice.lesson3 = data.lesson3price
      this.lessonprice.lesson1percent = data.lesson1percent
      this.lessonprice.lesson2percent = data.lesson2percent
      this.lessonprice.lesson3percent = data.lesson3percent
      // this.filename = data.image
      this.imageSrc = data.image
      this.loadimage(data.image)
      this.http.get(this.service.URL + 'lessons/lessonbyquotid/' + this.data.id, { headers }).subscribe(async (datalesson: any) => {

        datalesson.forEach((element: any, i: any) => {
          this.lessondata.push({
            detail: element.detail,
            quantity: element.quantity,
            price_per_unit: element.price_per_unit,
            sum_price: element.sum_price
          })
        });
      })

      this.http.get(this.service.URL + 'instantpayments/instbyquotid/' + this.data.id, { headers }).subscribe(async (datainstant: any) => {

        datainstant.forEach((element: any, i: any) => {
          this.instantpayment.push({
            detail: element.detail,
            quantity: element.quantity,
            price_per_unit: element.price_per_unit,
            sum_price: element.sum_price
          })
        });
      })
    })
  }

  addlessondata() {
    this.lessondata.push({
      detail: null,
      quantity: 0,
      price_per_unit: 0,
      sum_price: 0
    })
    this.calprice()
  }


  addinstantpayment() {
    this.instantpayment.push({
      detail: null,
      quantity: 0,
      price_per_unit: 0,
      sum_price: 0
    })
    this.calprice()
  }

  savedatamaster() {


    this.confirmService.confirm({
      title: 'confirm',
      message: 'บันทึกใบเสนอราคา?',
      width: '250px',
    }).subscribe(async (res: any) => {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
      if (res) {
        this.http.post(this.service.URL + 'quotations', {
          quotation_code: this.data_doc.doc_no,
          quotation_date: this.data_doc.doc_date,
          customer_name: this.data_doc.customer_name,
          customer_address: this.data_doc.customer_address,
          sum: this.data_price.sum,
          discount: this.data_price.discount,
          vat: this.data_price.vat,
          total: this.data_price.total,
          deposit: this.data_price.deposit,
          lesson1percent: this.lessonprice.lesson1percent,
          lesson2percent: this.lessonprice.lesson2percent,
          lesson3percent: this.lessonprice.lesson3percent,
          lesson1price: this.lessonprice.lesson1,
          lesson2price: this.lessonprice.lesson2,
          lesson3price: this.lessonprice.lesson3,
          quotation_detail: this.data_doc.doc_detail,
          image:this.imageSrc
        }, { headers }).subscribe(async (data: any) => {
          // await this.saveimage()
          await this.savedatalesson(data._id)
          await this.savedatainst(data._id)
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

  savedatalesson(masterid: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.lessondata.forEach((element: any) => {
      this.http.post(this.service.URL + 'lessons', {
        detail: element.detail,
        quantity: 1,
        price_per_unit: element.sum_price,
        sum_price: element.sum_price,
        quotation: masterid
      }, { headers }).subscribe(async (data: any) => {

      })
    });

  }

  savedatainst(masterid: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.instantpayment.forEach((element: any) => {
      this.http.post(this.service.URL + 'instantpayments', {
        detail: element.detail,
        quantity: 1,
        price_per_unit: element.sum_price,
        sum_price: element.sum_price,
        quotation: masterid
      }, { headers }).subscribe(async (data: any) => {

      })
    });
  }

  calprice() {
    var sum = 0
    var sum_inst = 0
    this.lessondata.forEach((element: any) => {
      sum += element.sum_price
    });
    this.instantpayment.forEach((element1: any) => {
      sum_inst += element1.sum_price
    });
    this.data_price.sum = sum + sum_inst
    this.sum_inst = sum_inst
    this.data_price.total = this.data_price.sum - this.data_price.discount - this.data_price.vat

    this.lessonprice.lesson1 = (40 / 100 * sum) + sum_inst
    this.lessonprice.lesson2 = (40 / 100 * sum)
    this.lessonprice.lesson3 = (20 / 100 * sum)
  }

  formdata: any
  filename: any = null

  onImageSelected(event: any) {
    console.log(event.target.files[0].name);
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      this.drawOnCanvas();
      console.log(this.imageSrc)
    };
    reader.readAsDataURL(file);

    this.formdata = new FormData();
    this.formdata.append('file', file);
    this.filename = event.target.files[0].name

  }

  loadimage(filename:any){
    // this.http.get(this.service.URL + 'quotations/download/'+filename, { responseType: 'blob' })
    //   .subscribe((response: Blob) => {
        // const reader = new FileReader();
        // reader.onloadend = () => {
          // this.imageSrc = reader.result as string;
          // this.drawOnCanvas();
        // };
        this.drawOnCanvas();
        // reader.readAsDataURL(response);
        // reader.readAsText(filename)
      // });
  }

  saveimage() {
    if (this.filename != null) {
      this.http.post(this.service.URL + 'quotations/upload', this.formdata).subscribe((res: any) => {
        console.log('Upload successful', res);
      }, (error) => {
        console.error('Upload failed', error);
      })
    }

  }

  drawOnCanvas() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    const image = new Image();
    image.onload = () => {
      context?.clearRect(0, 0, canvas.width, canvas.height);
      context?.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    image.src = this.imageSrc;
  }
}
