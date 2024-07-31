import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IUsers } from '../IUsers';
import { UserService } from '../userService';
import { NgIf } from '@angular/common';
import { Subscriber, Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit , OnDestroy{
  constructor(private _userService: UserService) { }
  users: IUsers[] = [];
  filterUsers: IUsers[] = [];
  numberOfPage: number = 1;
  id: number = 0;
  next() {
    if (this.numberOfPage == 1) {
      this.users = [];
      this.numberOfPage++;
      this._userService.getUsers(this.numberOfPage).subscribe({
        next: (response) => {
          this.users = response.data;
        }
      })
    }
  }
  prev() {
    if (this.numberOfPage == 2) {
      this.users = [];
      this.numberOfPage--;
      this._userService.getUsers(this.numberOfPage).subscribe({
        next: (response) => {
          this.users = response.data;
        }
      })
    }
  }
  private subscriptions = new Subscription();
  ngOnInit(): void {

    this.subscriptions = this._userService.getUsers(this.numberOfPage).subscribe({
      next: (response) => {
        this.users = response.data;
      }
    })
  }

  search(id: string) {
    this.id = Number(id);
    if (this.id !== 0) {

      this.users = this.users.filter(user => Number(user.id) === Number(id))
    } else {
      this._userService.getUsers(this.numberOfPage).subscribe({
        next: (response) => {
          this.users = response.data;
        }
      })
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
