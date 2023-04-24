import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserLoginComponent} from "./user-login/user-login.component"
import {UserProfileComponent} from "./user-profile/user-profile.component"

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: UserLoginComponent },
    { path: 'userProfile', component: UserProfileComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
export class AppRoutingModule {}
  