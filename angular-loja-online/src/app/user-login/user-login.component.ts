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
        this.users.forEach(function(user) {
            if(user.email === mail) {
                if(user.password === pass) {
                    // return login bem sucedido
                } else {
                    alert("A password inserida esta incorreta!");
                    return;
                }
            }
        });
        alert("Nao existe nenhuma conta associada a este e-mail!");
    }

}
