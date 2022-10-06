import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../login/auth.service';
import { User } from '../login/user';

const url: string = 'http://localhost:3000/users';
const login: string = "/login"

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userList: User[] = []

  constructor(private http:HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers()
  }

  async getUsers() {

  const users = await firstValueFrom(this.http.get<User[]>(url))
  
  this.userList = users;

  }

  loggout() {
    this.authService.loggoutUser()
    this.router.navigate([login])
  }

}
