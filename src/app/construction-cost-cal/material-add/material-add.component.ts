import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from 'src/app/services/app-confirm/app-confirm.service';
import { service } from 'src/app/services/service';

@Component({
  selector: 'app-material-add',
  templateUrl: './material-add.component.html',
  styleUrls: ['./material-add.component.css'],
})
export class MaterialAddComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MaterialAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public datepipe: DatePipe,
    private confirmService: AppConfirmService,
    private _snackBar: MatSnackBar,
    private http: HttpClient,
    private services: service
  ) {}

  MaterialData: any = {
    MaterialDesc: null,
    PricePerUnit: null,
    UnitDesc: null,
  };

  ngOnInit(): void {
    if (this.data.id) {
      console.log('edit');
    } else {
      console.log('add');
    }
  }

  savedata(){

  }
}
