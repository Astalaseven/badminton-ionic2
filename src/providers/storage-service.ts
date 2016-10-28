import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native';

@Injectable()
export class StorageService {

  constructor() {
    console.log('Hello StorageService Provider');
  }

  public getHistoric() {

    return NativeStorage.getItem('historic')
      .then(
      data => {
        return data;
      },
      error => {
        NativeStorage.setItem('historic', []);
        console.error(error);
      });
  }

  public saveHistoric(sets) {
    // NativeStorage.setItem('historic', []);

    NativeStorage.getItem('historic')
      .then(
      data => {
        console.log('Save sets');
        console.log(data);
        
        data.push(
          {
            'sets': sets,
            'date': new Date(),
          }
        );
        
        console.log(data.length);
        
        NativeStorage.setItem('historic', data).then(
          (data) => {
            console.log('Stored');
            console.log(data);
          },
          err => {
            console.error(err);
          });
      },
      err => {
        NativeStorage.setItem('historic', []);
        console.log(err);
      }
      )
  }
  
  public undoSaveHistoric() {
    // NativeStorage.setItem('historic', []);

    NativeStorage.getItem('historic')
      .then(
      data => {
        console.log('Save sets');
        console.log(data);
        
        data.pop();
        
        console.log(data.length);
        
        NativeStorage.setItem('historic', data).then(
          (data) => {
            console.log('Stored');
            console.log(data);
          },
          err => {
            console.error(err);
          });
      },
      err => {
        NativeStorage.setItem('historic', []);
        console.log(err);
      }
      )
  }

}
