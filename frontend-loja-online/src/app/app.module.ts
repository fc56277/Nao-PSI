import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserFollowersComponent } from './user-followers/user-followers.component';
import { UserFollowingComponent } from './user-following/user-following.component';
import { UserLibraryComponent } from './user-library/user-library.component';
import { UserWishlistComponent } from './user-wishlist/user-wishlist.component';
import { UserPersonalizedListComponent } from './user-personalized-list/user-personalized-list.component';
import { ItemsSearchComponent } from './items-search/items-search.component';
import { GameDetailComponent } from './game-detail/game-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    UserLoginComponent,
    UserRegisterComponent,
    DashboardComponent,
    UserFollowersComponent,
    UserFollowingComponent,
    UserLibraryComponent,
    UserWishlistComponent,
    UserPersonalizedListComponent,
    ItemsSearchComponent,
    GameDetailComponent ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }