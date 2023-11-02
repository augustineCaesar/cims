
import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BaptismService } from '../baptism.service';

@Component({
  selector: 'app-baptism-add',
  templateUrl: './baptism-add.component.html',
  styleUrls: ['./baptism-add.component.scss']
})
export class BaptismAddComponent implements OnInit {
  bapdetails: FormGroup;
  showLoading = false;
  loadingMessage: string;
  constructor(private fb: FormBuilder, private router: Router, private baptismService: BaptismService){}

  ngOnInit() {
    this.bapdetails = this.fb.group({
      Bnumber: ['',[Validators.required, ]],
      Bdate: ['', [Validators.required, ]],
      Bplace: ['',[Validators.required, ]],
      DOB: ['',[Validators.required, ]],
      Bname: ['', [Validators.required, ]], //baptism name and family name
      Parentsname: ['',[Validators.required, ]],
      Parentsaddr: ['', [Validators.required, ]],
      Godparent: ['',[Validators.required, ]],
      Bminister: ['', [Validators.required, ]],
      Firstcommdate: ['',[]],
      Firstcommplace: ['',[]],
      Confdate: ['', []],
      Confplace: ['', []],
      Spousename : ['',[]],
      Spouseplace : ['',[]],
      Death: ['', []],
      Observations: ['', []],
    })
  }

  async submit() {
    this.showLoading = true;
    this.loadingMessage = "Adding info user..."; 
    const user = await this.baptismService. addBap(this.bapdetails.value);
    this.showLoading = false;

    if (user) {
      this.showLoading = true;
      this.loadingMessage = "Info Added Successfully!"
      setTimeout(() => {
        this.router.navigateByUrl('', {replaceUrl: true}); 
      }, 1200);
      
      this.showLoading = false;

    } else {
      this.loadingMessage = 'Registration failed', 'Please try again'; 
      setTimeout(() => {
        this.loadingMessage = '';
      }, 3000);
    }
  
  }


  get Bnumber() {
    return this.bapdetails.get('Bnumber');  
  }

  get Bdate() {
    return this.bapdetails.get('Bdate');
  }

  get Bplace() {
    return this.bapdetails.get('Bplace');
  }

  get DOB() {
    return this.bapdetails.get('DOB');
  }

  get Bname() {
    return this.bapdetails.get('Bname');
  }

  get Parentsname() {
    return this.bapdetails.get('Parentsname');
  }

  get Parentsaddr() {
    return this.bapdetails.get('Parentsaddr');
  }

  get Godparent() {
    return this.bapdetails.get('Godparent');
  }
  get Bminister() {
    return this.bapdetails.get('Bminister');
  }
  get Firstcommdate() {
    return this.bapdetails.get('Firstcommdate');
  }
  get Firstcommplace() {
    return this.bapdetails.get('Firstcommplace');
  }
  get Confdate() {
    return this.bapdetails.get('Confdate');
  }
  get Confplace() {
    return this.bapdetails.get('Confplace');
  }
  get Spousename() {
    return this.bapdetails.get('Spousename');
  }
  get Spouseplace() {
    return this.bapdetails.get('Spouseplace');
  }
  get Death() {
    return this.bapdetails.get('Death');
  }
  get Observations() {
    return this.bapdetails.get('Observations');
  }

}
