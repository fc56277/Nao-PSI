import { Component } from '@angular/core';
import { User } from "../user";
import { Game } from "../game";
import { UserService } from "../user.service"
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.5s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
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

    register(name: string, pass1: string, pass2: string): void {
        const alphanumeric = /^[0-9a-zA-Z]+$/;
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]+$/;

        if(name.length < 3 || !alphanumeric.test(name)) {
            alert("O nome de utilizador só pode ter caracteres alfanuméricos e deve ter três caracteres no mínimo!");
            return;
        }
        let userExists = false;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].name === name) {
                userExists = true;
                break;
            }
        }
        if (userExists) {
            alert("Este username não está disponivel.")
            return;
        }

        if (!(pass1 === pass2)) {
            alert("As passwords inseridas nao coincidem!")
            return;
        }
        if (pass1.length < 8 || !pattern.test(pass1)) {
            alert("A password deve ter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um algarismo!")
            return;
        }
        var list: Game[] = []
        this.userService.registerUser({ name: name, password: pass1, wishList: list, library: list} as User)
            .subscribe(
                () => {
                    alert("Registo bem sucedido")
                    // Redirect to login page
                    this.goToLogin();
                }
            );
    }  
    
    goToLogin(): void {
        this.router.navigate(['/login']);
    }
 }