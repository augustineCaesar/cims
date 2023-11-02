import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SmsService } from '../sms.service';


@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit{

  smsdetails: FormGroup;
  showLoading = false;
  loadingMessage: string;
  all=[]; //array holding all contact numbers
  local=[]; //array holding local council contact numbers

  constructor(private fb: FormBuilder, private router: Router, private smsService: SmsService) {}

  ngOnInit(): void {
    // fetch list of receivers
    this.smsdetails = this.fb.group({
      message: ['',[Validators.required, ]],
      smsdate: ['', [ ]],
      sender: ['',[Validators.required, ]],
    });
  }

  async sendSMS() {
    // check if array has value
    this.loadingMessage  = "Verifying Audience...";
    this.showLoading = true;
    if (this.all.length > 0) {
      let message = this.smsdetails.value.message + " " + this.smsdetails.value.sender;
      let numbers = this.all.join(',').toString();
      this.loadingMessage = this.smsService.smsSender(message,numbers);
      this.showLoading = false;
    } else {
      this.loadingMessage  = "Audience verification failed. Check Internet connection and try again...";
      this.showLoading = false;
      setTimeout(() => {
        this.loadingMessage  = "";
      }, 2000);
      return;
    }   
  }

  async getReceivers(audience) {
    this.smsService.getContactsList(audience).subscribe((res : []) => {
      if (res) { 
        
        return res;
      } else {
        return null;
      }
    });
  }

  audienceChanged(x) {
    switch (x.value) {
      case "all":
        console.log("all");
        this.smsService.getContactsList('all').subscribe((res : any) => {
          if (res) {
            let list= [];
            console.log(res);
            res.forEach((element, index, array) => {
              list.push(element.phone);
            });
            // let numberlist = list.join(",");
            this.all = list;
            console.log(this.all);
            return ;
          } else {
            // show error
            return null;
          }
        });
        break;
    
      case 'local':
        console.log("local");
        break;

      default:
        break;
    }
  }

  get sender() {
    return this.smsdetails.get('sender');  
  }

  get smsdate() {
    return this.smsdetails.get('smsdate');
  }

  get message() {
    return this.smsdetails.get('message');
  }

}
