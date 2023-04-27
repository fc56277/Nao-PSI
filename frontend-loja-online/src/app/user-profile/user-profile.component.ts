import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { UserService } from "../user.service"
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const _id = this.route.snapshot.paramMap.get('id');
    console.log('Fetched _id:', _id); // Add this log
    if (!_id) {
      console.error('Invalid or missing _id');
      return;
    }
    this.userService.getUser(_id)
      .subscribe(user => this.user = user);
  }

  goBack(): void {
    this.location.back();
  }
}