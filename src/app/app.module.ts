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
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ProjectComponent } from './project/project.component';
import { ExpenseComponent } from './expense/expense.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ExpenseDetailComponent } from './expense/expense-detail/expense-detail.component';
import { AuthGuard } from './services/guards/auth.guard';
import { SignupComponent } from './sessions/signup/signup.component';
import { UserDetailComponent } from './manage-user/user-detail/user-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    QuotationComponent,
    QuoDetailComponent,
    AppConfirmComponent,
    SigninComponent,
    SignupComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    ManageUserComponent,
    ProjectComponent,
    ExpenseComponent,
    ProjectDetailComponent,
    ExpenseDetailComponent,
    UserDetailComponent,
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
  providers: [DatePipe, AppConfirmService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
