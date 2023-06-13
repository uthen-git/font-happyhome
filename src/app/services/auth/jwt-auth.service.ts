import { Injectable } from "@angular/core";
import { LocalStoreService } from "../local-store.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { map, catchError, delay } from "rxjs/operators";
// import { User } from "../../models/user.model";
import { of, BehaviorSubject, throwError } from "rxjs";
import { service } from "../service";
import Swal from "sweetalert2";
// ================= only for demo purpose ===========
interface User {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string
}
// ================= you will get those data from server =======

@Injectable({
  providedIn: "root",
})
export class JwtAuthService {
  token: String = '';
  isAuthenticated: Boolean = false;
  user: User = {};
  user$ = (new BehaviorSubject<User>(this.user));
  signingIn: Boolean = false;
  return: string = '';
  JWT_TOKEN = "JWT_TOKEN";
  APP_USER = "USER";

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private service: service,

  ) {
    this.route.queryParams
      .subscribe(params => this.return = params['return'] || '/home');
  }

  public signin(email: string, password: string) {
    // return of({token: DEMO_TOKEN, user: DEMO_USER})
    //   .pipe(
    //     delay(1000),
    //     map((res: any) => {
    //       this.setUserAndToken(res.token, res.user, !!res);
    //       this.signingIn = false;
    //       return res;
    //     }),
    //     catchError((error) => {
    //       return throwError(error);
    //     })
    //   );

    // FOLLOWING CODE SENDS SIGNIN REQUEST TO SERVER

    this.signingIn = true;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.service.URL + 'users/login',
      {
        email: email,
        password: password
      })
      .pipe(
        map((res: any) => {
          this.setUserAndToken(res.token, res, !!res);
          this.signingIn = false;
          return res;
        }),
        catchError((error) => {
          return throwError(error);
        })
      );
  }
  /*
    checkTokenIsValid is called inside constructor of
    shared/components/layouts/admin-layout/admin-layout.component.ts
  */
  public checkTokenIsValid() {
    var jsonString: any = JSON.stringify(this.ls.getItem(this.APP_USER));
    var id: any = (JSON.parse(jsonString)._id)

    // return of(DEMO_USER)
    //   .pipe(
    //     map((profile: User) => {
    //       this.setUserAndToken(this.getJwtToken(), profile, true);
    //       this.signingIn = false;
    //       return profile;
    //     }),
    //     catchError((error) => {
    //       return of(error);
    //     })
    //   );

    /*
      The following code get user data and jwt token is assigned to
      Request header using token.interceptor
      This checks if the existing token is valid when app is reloaded
    */
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.getJwtToken()
    });
    return this.http.get(this.service.URL + 'users/' + id, { headers })
      .pipe(
        map((profile: User) => {
          this.setUserAndToken(this.getJwtToken(), profile, true);
          return profile;
        }),
        catchError((error) => {
          Swal.fire({
            icon: 'error',
            title: 'session หมดอายุ',
            allowOutsideClick: false,
          }).then((result) => {
            // โค้ดที่ต้องการให้ทำหลังจากผู้ใช้ปิด popup
            if (result.isConfirmed) {
              // กระทำเมื่อผู้ใช้คลิกปุ่ม OK
              this.signout();
            }
          });

          return of(error);
        })
      );
  }

  public signout() {
    this.setUserAndToken(null, null, false);
    this.router.navigateByUrl("sessions/signin");
  }

  isLoggedIn(): Boolean {
    return !!this.getJwtToken();
  }

  getJwtToken() {
    return this.ls.getItem(this.JWT_TOKEN);
  }
  getUser() {
    return this.ls.getItem(this.APP_USER);
  }

  setUserAndToken(token: any, userdata: any, isAuthenticated: Boolean) {
    this.isAuthenticated = isAuthenticated;
    this.token = token;
    if (userdata) {
      this.user = {
        id: userdata._id,
        first_name: userdata.first_name,
        last_name: userdata.last_name,
        email: userdata.email
      };
      // this.ls.setItem("user_id", userdata._id);
    }

    this.user$.next(userdata);
    this.ls.setItem(this.JWT_TOKEN, token);
    this.ls.setItem(this.APP_USER, userdata);


  }
}
