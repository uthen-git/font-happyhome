import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuotationComponent } from './quotation/quotation.component';
import { SessionsRoutes } from "./sessions/sessions.routing";
import { AdminLayoutComponent } from "./services/layout/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./services/layout/auth-layout/auth-layout.component";

export const rootRouterConfig: Routes = [
  {
    path:'',
    component:AdminLayoutComponent,
    children:[
      {
        path: 'home',
        component:DashboardComponent
      },
      {
        path:'quotation',
        component:QuotationComponent
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
