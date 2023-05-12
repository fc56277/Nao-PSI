import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from "../user.service"
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-profile-to-watch',
  templateUrl: './user-profile-to-watch.component.html',
  styleUrls: ['./user-profile-to-watch.component.css'],
  animations: [
    trigger('fadeInOut', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('0.5s ease-in-out', style({ opacity: 1 }))
        ]),
        transition(':leave', [
          animate('0.5s ease-in-out', style({ opacity: 0 }))
        ])
      ])
  ]
})
export class UserProfileToWatchComponent implements OnInit {
  user: User | undefined;
  userSession: User | undefined;

  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}
      
  ngOnInit(): void {
    this.checkIfLogged();
    this.getUser();
    this.getUserSession();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe(user => {
        this.user = user;
        // use the user data here or call other functions that depend on the user data
      });
    } else {
      // handle the case when id is null
    }
    console.log(id)
  }  

  getUserSession(): void {
      this.userService.getUser()
        .subscribe(userSession => this.userSession = userSession);
    }
  
  goBack(): void {
    this.location.back();
  }

  followUser(user: User): void {
      if (this.userSession) {
        if (!this.userSession.following.some(followingUser => {followingUser.toString() === user._id})) {
          this.userSession.following.push(user);
          this.userService.updateUser(this.userSession).subscribe(() => {alert(`Adicionado o user ${user.name}`);
          });
        } 
        if (!user.followers.some(followerUser => {
          followerUser.toString() === this.userSession?._id})) {
          user.followers.push(this.userSession);
          this.userService.updateUser(user).subscribe(() => {alert(`Adicionado o user ${user.name}`);
          });
        } 
      }
      else {
        alert("else");
    }
  }

  doLogOut(): void {
    this.userService.logOutUser()
      .subscribe(
        (response) => {
          alert(response.message);
          // Redirect to login page
          this.router.navigate(['/login']);
        }
      );
  }

  checkIfLogged(): void {
    this.userService.checkIfLogged()
    .subscribe(
      (response) => {
        if(!response.value) {
          alert("Nenhum Utilizador autenticado.");
          this.router.navigate(['/login']);
        }
      }
    );
  }
}