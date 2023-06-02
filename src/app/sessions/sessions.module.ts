import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SessionsRoutes } from "./sessions.routing";
import { RouterModule } from "@angular/router";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(SessionsRoutes)
  ]
})
export class SessionsModule { }
