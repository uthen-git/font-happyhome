import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { rootRouterConfig } from "./app-routing.module";
import { AppComponent } from './app.component';

import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ExpenseDetailComponent } from './expense/expense-detail/expense-detail.component';
import { ExpenseComponent } from './expense/expense.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserDetailComponent } from './manage-user/user-detail/user-detail.component';
import { ProjectDetailComponent } from './project/project-detail/project-detail.component';
import { ProjectComponent } from './project/project.component';
import { QuoDetailComponent } from './quotation/quo-detail/quo-detail.component';
import { QuotationComponent } from './quotation/quotation.component';
import { AppConfirmComponent } from './services/app-confirm/app-confirm.component';
import { AppConfirmService } from "./services/app-confirm/app-confirm.service";
import { AuthGuard } from './services/guards/auth.guard';
import { AdminLayoutComponent } from './services/layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './services/layout/auth-layout/auth-layout.component';
import { SigninComponent } from './sessions/signin/signin.component';
import { SignupComponent } from './sessions/signup/signup.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ConstructionCostCalComponent } from './construction-cost-cal/construction-cost-cal.component';
import { MaterialAddComponent } from './construction-cost-cal/material-add/material-add.component';


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
    ConstructionCostCalComponent,
    MaterialAddComponent,
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
    MatPaginatorModule,
    MatStepperModule,
    MatSnackBarModule,
    MatProgressBarModule,
    RouterModule.forRoot(rootRouterConfig, { useHash: false })
  ],
  providers: [DatePipe, AppConfirmService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
