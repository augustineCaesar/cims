import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateAccountComponent } from './auth/create-account/create-account.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { LoginComponent } from './auth/login/login.component';
import { BaptismAddComponent } from './core/baptism-add/baptism-add.component';
import { BaptismRegisterComponent } from './core/baptism-register/baptism-register.component';
import { ContactsComponent } from './core/contacts/contacts/contacts.component';
import { SmsComponent } from './core/sms/sms/sms.component';

const routes: Routes = [
  
  {path: '', component: BaptismRegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'create-account', component: CreateAccountComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'b-add', component: BaptismAddComponent},
  {path: 'sms', component: SmsComponent},
  {path: 'users', component: ContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
