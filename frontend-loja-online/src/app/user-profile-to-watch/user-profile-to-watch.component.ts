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

  constructor(
    private router: Router,
    private userService: UserService,
    private location: Location,
    private route: ActivatedRoute,
  ) {}
      
  ngOnInit(): void {
    this.checkIfLogged();
    this.getUser();
  }

  getUser(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id)
        .subscribe(user => this.user = user);
    } else {
      // handle the case when id is null
    }
  }
  
  
  goBack(): void {
    this.location.back();
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