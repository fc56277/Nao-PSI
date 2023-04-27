import { Component } from '@angular/core';
import { User } from "../user";
import { UserService } from "../user.service"
@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.css']
})

export class UserLoginComponent {
    users: User[] = [];

    constructor(
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers().subscribe((users:User[]) => {
            this.users = users;
        })
    }

    login(mail: string, pass: string): void {
        var exists = false;
        var id = null;
        this.users.forEach(function(user) {
            if(user.email === mail) {
                exists = true;
                if(user.password === pass) {
                    id = user._id;
                    return;
                } else {
                    alert("A password inserida esta incorreta!");
                    return;
                }
            }
        });
        if(!exists) {
            alert("Nao existe nenhuma conta associada a este e-mail!");
        } else if(id != null) {
            this.userService.loginUser(id).subscribe();
        }
    }
}