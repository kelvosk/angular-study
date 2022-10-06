import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';

const home = '/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userAuthenticated: boolean = false;

  constructor(private router: Router) { }

  login(user: User, password: string) {

    if(this.matchesPassword(user.password, password)){
      this.userAuthenticated = true
      this.router.navigate([home])
    } else {
      window.alert('Invalid User or Password')
    }

  }

  matchesPassword(userPassword: string, loginPassword: string) {
    return userPassword === loginPassword
  }
  
  isUserAuthenticated() {
    return this.userAuthenticated
  }

  loggoutUser() {
    this.userAuthenticated = false
  }

}
