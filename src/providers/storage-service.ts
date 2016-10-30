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

export class Player {
  name: string;
  color: string;
}

export const DEFAULT_PLAYERS: Player[] = [
  {
    name: 'Player 1',
    color: '#32db64'
  },
  {
    name: 'Player 2',
    color: '#f53d3d'
  }
];


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
        NativeStorage.setItem('players', DEFAULT_PLAYERS);
        console.error(error);
      });
  }

  public getPlayer(name) {

    return this.getPlayers()
      .then(
      data => {
        console.log(data);
        
        let player = data.filter(function (obj) {
          console.log(obj.name, name);
          return obj.name === name;
        });

        return player;
      },
      error => {
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
        NativeStorage.setItem('players', DEFAULT_PLAYERS);
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
        NativeStorage.setItem('players', DEFAULT_PLAYERS);
        console.log(err);
      }
      )
  }
}
