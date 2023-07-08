import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppConfirmService } from '../services/app-confirm/app-confirm.service';
import { service } from '../services/service';
import { MaterialAddComponent } from './material-add/material-add.component';

@Component({
  selector: 'app-construction-cost-cal',
  templateUrl: './construction-cost-cal.component.html',
  styleUrls: ['../app.component.css'],
})
export class ConstructionCostCalComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private services: service,
    private confirmService: AppConfirmService,
    private _snackBar: MatSnackBar
  ) {}

  TotalPrice: number = 0;

  MaterialSelect: any = [
    {
      material: null,
      quantity: 0,
      sum: 0,
    },
    {
      material: null,
      quantity: 0,
      sum: 0,
    },
    {
      material: null,
      quantity: 0,
      sum: 0,
    },
  ];

  MaterialList: any = [
    {
      id: 1,
      MaterialDesc: 'เหล็กกล่อง 1',
      PricePerUnit: 2000,
      UnitDesc: 'ชิ้น',
    },
    {
      id: 2,
      MaterialDesc: 'เหล็กกล่อง 2',
      PricePerUnit: 3000,
      UnitDesc: 'ชิ้น',
    },
    {
      id: 3,
      MaterialDesc: 'กระเบื้อง',
      PricePerUnit: 5400,
      UnitDesc: 'ชิ้น',
    },
    {
      id: 4,
      MaterialDesc: 'เหล็กข้ออ้อย',
      PricePerUnit: 1000,
      UnitDesc: 'ชิ้น',
    },
  ];
  displayedColumns: string[] = ['NO', 'desc', 'price', 'unitname', 'manage'];

  ngOnInit(): void {
    this.SelectMaterial();
  }

  SelectMaterial() {}

  AddMaterial() {
    this.MaterialSelect.push({
      material: null,
      quantity: 0,
      sum: 0,
    });
  }
  async DeleteMaterial(i: number) {
    await this.MaterialSelect.splice(i, 1);
    await this.cal();
  }

  cal() {
    this.TotalPrice = 0;
    this.MaterialSelect.forEach((element: any) => {
      console.log(element.material);
      element.sum = element.material * element.quantity;
      this.TotalPrice += element.material * element.quantity;
    });
  }

  edit() {}

  delete(i: number) {}

  opendialog(id: any) {
    const dialogRef = this.dialog.open(MaterialAddComponent, {
      data: { id },
      width: '60%',
      height: '50%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      this.SelectMaterial();
    });
  }

}
