import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native';

@Injectable()
export class StorageService {

  constructor() {

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

    NativeStorage.getItem('historic')
      .then(
      data => {

        data.push(
          {
            'sets': sets,
            'date': new Date(),
          }
        );

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

    NativeStorage.getItem('historic')
      .then(
      data => {

        data.pop();

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
