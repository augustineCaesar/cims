

import { Injectable } from '@angular/core';
import { addDoc, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';

export interface SMS {
  id? :string;
  message: string;
  sdate: string;
  sender?: string; 
}

export interface Contact {
  id? : string;
  name: string;
  number: string;
}

export interface Receiver {
  number: string;
}

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  constructor( private firestore: Firestore) { }

  deleteSMS(sms: SMS) {
    const SMSListRef = doc(this.firestore, `sms/${sms.id}`);
    return deleteDoc(SMSListRef);
  }

  getSMSList(): Observable<SMS[]> {
    const SMSlistRef = collection(this.firestore, 'sms');
    return collectionData(SMSlistRef, {idField: 'id'}) as Observable<SMS[]>;
  }

  addSMS(sms: SMS) {
    const SMSListRef = collection(this.firestore, 'sms');
    return addDoc(SMSListRef, sms);
  }

  getReceiversList(): Observable<Receiver[]> {
   const ReceiverListRef = collection(this.firestore, 'numberlist');
   return collectionData(ReceiverListRef) as Observable<Receiver[]>
  }

  getContactsList(audience) : Observable<Contact[]>  {
    try {
      const ContactlistRef = collection(this.firestore,'contacts');
      return collectionData(ContactlistRef, {}) as Observable<Contact[]>;
    } catch (error) {
      console.log('an error occured', error);
      return null
    }
  }

  smsSender(message, numberlist): string {
    let result :any;
    var formdata = new FormData();
    formdata.append("api_key", "9c92787e56964f94b0463874de895abb");
    formdata.append("phone", numberlist );
    formdata.append("message", message);
    formdata.append("sender_id", "VUUMA");

    var requestOptions = {
      method: 'POST',
      body: formdata,
    };

    fetch("https://sms.vuuma.co.ke/api/sms/v1/sendsms", requestOptions)
    .then((response) => {
      result = response.text();
      return result as string;
    })
    .then ((result) => {
      result = 'Message Sent Successfully';
      return result;
    })
    .catch((error) => {
      result = error;
      return result as string;
    })

    return result;
  }
  

  testSms() {
    var formdata = new FormData();
    formdata.append("api_key", "9c92787e56964f94b0463874de895abb");
    formdata.append("phone", "0716207243");
    formdata.append("message", "Hey bro PostMan SMS Works");
    formdata.append("sender_id", "VUUMA");

    var requestOptions = {
      method: 'POST',
      body: formdata,
      // redirect: 'follow'
    };

    fetch("https://sms.vuuma.co.ke/api/sms/v1/sendsms", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  }

  }
