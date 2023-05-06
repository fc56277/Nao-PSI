import { Component } from '@angular/core';
import { User } from "../user";
import { UserService } from "../user.service"
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css'],
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

export class UserLoginComponent {
    users: User[] = [];

    constructor(
        private userService: UserService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers().subscribe((users:User[]) => {
            this.users = users;
        })
    }

    login(username: string, pass: string): void {   
        var success = false;
        var id: string | null = null;
        this.users.forEach(function(user) {
            if(user.name === username) {
                if(user.password === pass) {
                    success = true;
                    id = user._id;
                    return;
                }
            }
        });
        if(!success) {
            alert("Ocorreu um erro na autenticação");
        } else if (id != null) {
            this.userService.loginUser(id).subscribe(
                (response) => {
                  alert(response.message);
                  // Redirect to login page
                  this.router.navigate(['/dashboard']);
                }
              );
        }
    }

    goToRegister() {
        this.router.navigate(['/register']);
    }
}