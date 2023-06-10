import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotationComponent } from './quotation/quotation.component';
import { AdminLayoutComponent } from "./services/layout/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./services/layout/auth-layout/auth-layout.component";
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ProjectComponent } from './project/project.component';
import { ExpenseComponent } from './expense/expense.component';
import { AuthGuard } from './services/guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path:'',
    component:AdminLayoutComponent,
    canActivate:[AuthGuard],
    children:[
      {
        path: '',
        component:DashboardComponent
      },
      {
        path: 'home',
        component:DashboardComponent
      },
      {
        path:'quotation',
        component:QuotationComponent
      },
      {
        path:'manage-user',
        component:ManageUserComponent
      },
      {
        path:'project',
        component:ProjectComponent
      },
      {
        path:'expense',
        component:ExpenseComponent
      }
    ]
  },{
    path:'',
    component:AuthLayoutComponent,
    children:[
      {
        path:'sessions',
        loadChildren:()=> import("./sessions/sessions.module").then(m => m.SessionsModule)
      }
    ]
  },{
    path: '**',
    redirectTo: 'sessions/404'
  }
];
