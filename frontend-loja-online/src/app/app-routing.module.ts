import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {UserLoginComponent} from "./user-login/user-login.component";
import {UserRegisterComponent} from "./user-register/user-register.component";
import {UserProfileComponent} from "./user-profile/user-profile.component";
import {DashboardComponent } from './dashboard/dashboard.component';
import {UserFollowersComponent} from './user-followers/user-followers.component';
import {UserFollowingComponent} from './user-following/user-following.component';
import {UserPersonalizedListComponent} from './user-personalized-list/user-personalized-list.component';
import {UserWishlistComponent} from './user-wishlist/user-wishlist.component';
import {UserLibraryComponent} from './user-library/user-library.component';
import {GameDetailComponent} from './game-detail/game-detail.component';
import { SendPresentComponent } from './send-present/send-present.component';
import { RecievePresentComponent } from './recieve-present/recieve-present.component';


const routes: Routes = [
  // no futuro redirect e para o dashboard do User logado
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'login', component: UserLoginComponent },
    { path: 'register', component: UserRegisterComponent },
    { path: 'user', component: UserProfileComponent },
    { path: 'send/:id', component: SendPresentComponent},
    { path: 'recieve/:id', component: RecievePresentComponent},
    { path: 'biblioteca', component: UserLibraryComponent },
    { path: 'wishlist', component: UserWishlistComponent },
    { path: 'listas-personalizadas', component: UserPersonalizedListComponent },
    { path: 'followers', component: UserFollowersComponent },
    { path: 'following', component: UserFollowingComponent },
    { path: 'detail/:id', component: GameDetailComponent },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })
export class AppRoutingModule {}