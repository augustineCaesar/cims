import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  credentials: FormGroup;
  showLoading = false;
  loadingMessage: string;
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService,) {}

  get email() {
    return this.credentials.get('email');  
  }

  get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    })
  }

  async register() {
    this.showLoading = true;
    this.loadingMessage = "Creating user..."; 
    const user = await this.authService.register(this.credentials.value);
    this.showLoading = false;

    if (user) {
      this.showLoading = true;
      this.loadingMessage = "User Created! You will be redirected to login page"
      setTimeout(() => {
        this.router.navigateByUrl('/login', {replaceUrl: true}); 
      }, 3500);
      
      this.showLoading = false;

    } else {
      this.loadingMessage = 'Registration failed', 'Please try again'; 
      setTimeout(() => {
        this.loadingMessage = '';
      }, 3000);
    }
  }
}
