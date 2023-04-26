import { Component } from '@angular/core';
import { User } from "../user";
import { Game } from "../game";
import { UserService } from "../user.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent {
    users: User[] = [];
    
    constructor(
        private userService: UserService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getUsers();
    }

    getUsers(): void {
        this.userService.getUsers().subscribe((users:User[]) => {
            this.users = users;
        })
    }

    register(name: string, mail: string, pass1: string, pass2: string): void {
        if (!(pass1 === pass2)) {
            alert("As passwords inseridas nao coincidem!")
            return;
        }
        if (pass1.length < 5) {
            alert("A password deve ter pelo menos 5 caracteres!")
            return;
        }
        let emailExists = false;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].email === mail) {
                emailExists = true;
                break;
            }
        }
        if (emailExists) {
            alert("Ja existe uma conta associada a este e-mail!")
            return;
        }
        var list: Game[] = []
        this.userService.registerUser({ name: name, email: mail, password: pass1, wishList: list } as User)
            .subscribe(
                () => {
                    alert("Registo bem sucedido")
                    // Redirect to login page
                    this.router.navigate(['/login']);
                }
            );
    }   
}