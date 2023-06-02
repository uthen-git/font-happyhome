import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { service } from "../../services/service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
    private service: service,
    private router: Router,
  ) { }

  signin() {
    this.router.navigate(['/home']);
  }
}
