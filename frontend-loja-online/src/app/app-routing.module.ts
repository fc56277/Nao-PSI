import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserLoginComponent} from "./user-login/user-login.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";

const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserRegisterComponent },
    { path: 'user/:id', component: UserProfileComponent },
    //{ path: 'biblioteca', component: BibliotecaComponent },
    //{ path: 'wishlist', component: WishlistComponent },
    //{ path: 'listas-personalizadas', component: ListasPersonalizadasComponent },
    //{ path: 'followers', component: FollowersComponent },
    //{ path: 'following', component: FollowingComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
export class AppRoutingModule {}