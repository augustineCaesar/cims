import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface User {
  id? :string;
  name: string;
  scc: string;
  phone: string;
  role? : string;
}



@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private firestore: Firestore) { }

   getUserList(): Observable<User[]> {
    const UserlistRef = collection(this.firestore, 'contacts');
    return collectionData(UserlistRef, {idField: 'id'}) as Observable<User[]>;
  }

  addUser(user: User) {
    const UserListRef = collection(this.firestore, 'contacts');
    return addDoc(UserListRef, user);
  }

  deleteUser(user: User) {
    const UserListRef = doc(this.firestore, `contacts/${user.id}`);
    return deleteDoc(UserListRef);
  }

  updateUser(user: User) {
    const UserListRef = doc(this.firestore, `contacts/${user.id}`);
    return updateDoc(UserListRef, user as {});
  }
}
