import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native';


export class Set {
  left: number;
  right: number;
}

export class Game {
  sets: Set[];
  date: Date;
}

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

  public getPlayers() {

    return NativeStorage.getItem('players')
      .then(
      data => {
        return data;
      },
      error => {
        NativeStorage.setItem('players', []);
        console.error(error);
      });
  }

  public savePlayer(player) {

    NativeStorage.getItem('players')
      .then(
      data => {

        data.push(player);

        NativeStorage.setItem('players', data).then(
          (data) => {
            console.log('Stored');
            console.log(data);
          },
          err => {
            console.error(err);
          });
      },
      err => {
        NativeStorage.setItem('players', []);
        console.log(err);
      }
      )
  }

  public deletePlayer(player) {

    NativeStorage.getItem('players')
      .then(
      data => {

        data.filter(function (p) {
          return p.name !== player.name;
        });

        NativeStorage.setItem('players', data).then(
          (data) => {
            console.log('Stored');
            console.log(data);
          },
          err => {
            console.error(err);
          });
      },
      err => {
        NativeStorage.setItem('players', []);
        console.log(err);
      }
      )
  }
}
