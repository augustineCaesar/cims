
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { AuthService } from '../auth.service';'@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  credentials: FormGroup ;
  showLoading: boolean | undefined;
  loadingMessage!: string;

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder ) { }

  ngOnInit(): void {
    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  get email() {
    return this.credentials.get('email');  
  }

  get password() {
    return this.credentials.get('password');
  }

  async login() {
    this.showLoading = true;
    this.loadingMessage = "Logging in.....";
    const user = await this.authService.login(this.credentials.value);
    this.showLoading = false;

    if (user) {
      this.showLoading = true;
      this.loadingMessage = "Successful.....";
      this.router.navigateByUrl('', {replaceUrl: true}); 
      this.showLoading = false;

    } else {
      this.loadingMessage = 'Login failed,Please try again'; 
      setTimeout(() => {
        this.loadingMessage = '';
      }, 3000);
    }
  }
}
