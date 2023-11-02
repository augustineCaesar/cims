import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { ContactsService } from '../contacts.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';

export interface User {
  id? :string;
  name: string;
  scc: string;
  phone: string;
  role? : string;
}
const UserData: User[] = [];

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit{
  cdetails: FormGroup;
  showLoading = false;
  loadingMessage: string;


  displayedColumns: string[] = ['name', 'phone', 'scc', 'actions'];
  dataToDisplay = UserData;


  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private fb: FormBuilder, private router: Router, private contactsService: ContactsService){}

  dataSource = new MatTableDataSource(this.dataToDisplay);
  
  ngOnInit(): void {
    this.contactsService.getUserList().subscribe( (res: any) => {
      UserData.length = 0;
      UserData.push(...res);
      console.log(res, 'i ran1');
      this.table.renderRows();
    });

    this.cdetails = this.fb.group({
      phone: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(15) ]],
      name : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(26)]],
      scc: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(26)]],
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  async addUser() {
    this.showLoading = true;
    this.loadingMessage = "Adding user..."; 
    const user = await this.contactsService.addUser(this.cdetails.value);
    this.showLoading = false;

    if (user) {
      this.showLoading = true;
      this.loadingMessage = "Info Added Successfully!"
      this.showLoading = false;
      setTimeout(() => {
        this.loadingMessage = "";
        this.cdetails.reset();
      }, 1200);
    } else {
      this.loadingMessage = 'Registration failed', 'Please try again'; 
      setTimeout(() => {
        this.loadingMessage = "";
      }, 2000);
    }
  
  }


  edit(x) {
    console.log(x);
  }

  async deleteUser(x) {
    console.log(x)
    await this.contactsService.deleteUser(x);
  }

  updateUser() {

  }

  get phone() {
    return this.cdetails.get('phone');  
  }

  get name() {
    return this.cdetails.get('name');  
  }

  get scc() {
    return this.cdetails.get('scc');  
  }

}

// class ExampleDataSource extends DataSource<User> {
//   private _dataStream = new ReplaySubject<User[]>();

//   constructor(initialData: User[]) {
//     super();
//     this.setData(initialData);
//   }

//   connect(): Observable<User[]> {
//     return this._dataStream;
//   }

//   disconnect() {}

//   setData(data: User[]) {
//     this._dataStream.next(data);
//   }
// }



