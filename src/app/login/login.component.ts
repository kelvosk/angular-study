import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from './user';

const url:string = 'http://localhost:3000/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  user: User = new User();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loginForm = new FormGroup(
      {
        'email': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required)
      }
    )
  }

  ngOnInit(): void {
  }

  async onSubmit(){

    const urlGet: string =  `${url}?email=${this.loginForm.value.email}`
    const password: string = `${this.loginForm.value.password}`

    const user = await firstValueFrom(this.http.get<User[]>(urlGet))

    this.user = user[0]
    
    this.authService.login(this.user, password)

  }

}
