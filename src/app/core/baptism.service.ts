import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface Baptism {
  id? :string;
  Bnumber: number;
  Bdate: string;
  Bplace: string;
  DOB: string;
  Bname: string;
  Parentsname: string;
  Parentsaddr: string;
  Godparent: string;
  Bminister: string;
  Firstcommplace: string;
  Firstcommdate: string;
  Confdate: string;
  Confplace: string;
  Spousename : string;
  Spousedate : string;
  Death: string;
  Observations?: string;
}

@Injectable({
  providedIn: 'root'
})
export class BaptismService {
 
  constructor(private firestore: Firestore) { }

  getBapList(): Observable<Baptism[]> {
    const BaplistRef = collection(this.firestore, 'baptism');
    return collectionData(BaplistRef, {idField: 'id'}) as Observable<Baptism[]>;
  }

  getBapById(id): Observable<Baptism> {
    const bref = doc(this.firestore, `baptism/${id}`);
    return docData(bref, {idField: 'id'}) as Observable<Baptism>;
  }

  addBap(Bap: Baptism) {
    const BapListRef = collection(this.firestore, 'baptism');
    return addDoc(BapListRef, Bap);
  }

  deleteBap(Bap: Baptism) {
    const BapListRef = doc(this.firestore, `baptism/${Bap.id}`);
    return deleteDoc(BapListRef);
  }

  updateBap(Bap: Baptism) {
    const BapListRef = doc(this.firestore, `baptism/${Bap.id}`);
    return updateDoc(BapListRef, Bap as {});
  }

}
