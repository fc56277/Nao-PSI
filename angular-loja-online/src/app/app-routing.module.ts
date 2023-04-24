import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserLoginComponent} from "./user-login/user-login.component"

const routes: Routes = [
    { path: '', redirectTo: '/', pathMatch: 'full' },
    { path: '/', component: UserLoginComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
export class AppRoutingModule {}
  