import { Injectable } from '@angular/core';
import  {Auth,getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword,  signInWithEmailAndPassword, signInWithPopup, signOut, User} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private auth: Auth, private router: Router ) { }

  async register({email,password}:{ email: string; password: string }) {
    try { 
      const user = await createUserWithEmailAndPassword(this.auth, email, password);
      this.authUser.next(user);
      return user; 
    } catch (error) {
      console.log(error);
      return null;
    } 
  }

  async login({email, password}: { email: string; password: string }) {
    try { 
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      this.authUser.next(user);
      return user; 
    } catch (error) {
      return null;
    } 
  }

  async passwordResetEmail(email:any) {
    var message;
    try {
      await sendPasswordResetEmail(this.auth, email);
      message = 'Password email link has been sent, check your email'
      return message;
    } catch (error) {
      message =  `Try creating account: user not found`;
      return message;
    }
}
}
