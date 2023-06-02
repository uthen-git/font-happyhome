import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { rootRouterConfig } from "./app-routing.module";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotationComponent } from './quotation/quotation.component';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { QuoDetailComponent } from './quotation/quo-detail/quo-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common'
import { MatStepperModule } from '@angular/material/stepper';
import { AppConfirmComponent } from './services/app-confirm/app-confirm.component';
import { AppConfirmService } from "./services/app-confirm/app-confirm.service";
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SigninComponent } from './sessions/signin/signin.component';
import { AdminLayoutComponent } from './services/layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './services/layout/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    QuotationComponent,
    QuoDetailComponent,
    AppConfirmComponent,
    SigninComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDividerModule,
    FormsModule,
    MatStepperModule,
    MatSnackBarModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  providers: [DatePipe, AppConfirmService],
  bootstrap: [AppComponent]
})
export class AppModule { }
