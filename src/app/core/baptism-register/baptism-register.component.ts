import { Component, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {DataSource} from '@angular/cdk/collections';
import {Observable, ReplaySubject} from 'rxjs';
import { Baptism, BaptismService } from '../baptism.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

let ELEMENT_DATA = [
  {position: 1, Bname: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, Bname: 'Helium', weight: 4.0026, symbol: 'He'},
];

@Component({
  selector: 'app-baptism-register',
  templateUrl: './baptism-register.component.html',
  styleUrls: ['./baptism-register.component.scss']
})
export class BaptismRegisterComponent {
  BAP_DATA = [];
  @ViewChild(MatTable) table: MatTable<any>;
  
  displayedColumns: string[] = ['positio', ];
  dataSource = ELEMENT_DATA;

  constructor(private Bservice: BaptismService) {
    this.Bservice.getBapList().subscribe( (res: any )=> {
      ELEMENT_DATA.push(...res);
      console.log(ELEMENT_DATA, 'i ran1');
      this.table.renderRows();
    })
  }

  
}



