import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from "../user.service"

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  user: User | undefined

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  getUser(): void {
    const _id = this.route.snapshot.paramMap.get('_id');
    console.log('Fetched _id:', _id); // Add this log
    if (!_id) {
      console.error('Invalid or missing _id');
      return;
    }
    this.userService.getUser(_id)
      .subscribe(user => this.user = user);
  }
}