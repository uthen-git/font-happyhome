import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { service } from '../services/service';
import { JwtAuthService } from '../services/auth/jwt-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  constructor(
    private http: HttpClient,
    private _service: service,
    private jwtAuth: JwtAuthService,
  ) {
    this.jwtAuth.checkTokenIsValid().subscribe((res) => {
      this.userdata = res;
    });
  }

  public progress:any = {
    target : 30,
    now : 0,
    percent : 0
  }
  a:any = 50

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.get(this._service.URL + 'projects', { headers }).subscribe((data: any) => {
      const now = data.length
      this.progress.now = now
      this.progress.percent = now/this.progress.target*100
    })
  }

  userdata?: any = {
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    role: null,
    __v: null,
    _id: null,
  };
}
