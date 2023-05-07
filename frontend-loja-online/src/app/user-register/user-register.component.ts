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

        let str = "";
        if(name.length < 3 || !alphanumeric.test(name)) {
            str += "\n- O nome de utilizador só pode ter caracteres alfanuméricos e deve ter três caracteres no mínimo!";
        }
        let userExists = false;
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].name === name) {
                userExists = true;
                break;
            }
        }
        if (userExists) {
            str += "\n- Este username não está disponivel.";
        }
        if (!(pass1 === pass2)) {
            str += "\n- As passwords inseridas nao coincidem!";
        }
        if (pass1.length < 8) {
            str += "\n- A password deve ter pelo menos 8 caracteres";
        }
        if (!/[a-z]/.test(pass1)) {
            str += "\n- A password deve incluir pelo menos uma letra minúscula!";
        }
        if (!/[A-Z]/.test(pass1)) {
            str += "\n- A password deve incluir pelo menos uma letra maiúscula!";
        }
        if (!/\d/.test(pass1)) {
            str += "\n- A password deve incluir pelo menos um número!";
        }
        if (str != ""){
            alert(str);
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