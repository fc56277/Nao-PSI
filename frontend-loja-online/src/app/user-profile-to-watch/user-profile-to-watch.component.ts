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
        const followingUserIdList = this.userSession.following.map(followingUser => followingUser.toString().trim());
        const userId = user._id.toString().trim();
        const isFollowing = followingUserIdList.indexOf(userId) !== -1;

        if(this.userSession._id === user._id){
          alert("Não pode seguir-se a si mesmo!");
        }
        else if (isFollowing) {
          alert("Não pode seguir alguém novamente!");
        } else {
          const userToFollow = JSON.parse(JSON.stringify(user));
          userToFollow.followers = [...user.followers, this.userSession];
          delete userToFollow.following;
          this.userService.updateUser(userToFollow).subscribe(() => { console.log("Done") });
    
          const userSessionToFollow = JSON.parse(JSON.stringify(this.userSession));
          userSessionToFollow.following = [...this.userSession.following, user];
          delete userSessionToFollow.followers;
          this.userService.updateUser(userSessionToFollow).subscribe(() => { console.log("Done") });

          location.reload();
        }
      }
      else {
        alert("Não pode seguir alguém novamente nem seguir-se a si mesmo!");
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