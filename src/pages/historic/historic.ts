import { Component } from '@angular/core';

import { AlertController } from 'ionic-angular';

import { Set, Game, StorageService } from '../../providers/storage-service';


@Component({
  templateUrl: 'historic.html'
})
export class HistoricPage {

  games: any[];
  toggle_sort: Function;

  constructor(private storageService: StorageService, private alertCtrl: AlertController) {

    this.showGames();
  }

  public showGames() {

    this.storageService.getHistoric()
      .then(
      data => {
        this.games = data;
        this.sortByDateDescending();
      },
      error => {
        console.log(error);
      }
      );
  }

  public toggleSort() {

    this.toggle_sort();
  }

  public sortByDateAscending() {

    this.games = this.games.sort(function (a, b) {

      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    this.toggle_sort = this.sortByDateDescending;
  }

  public sortByDateDescending() {

    this.games = this.games.sort(function (a, b) {

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    this.toggle_sort = this.sortByDateAscending;
  }

  public clearHistoric() {

    let confirm = this.alertCtrl.create({
      title: 'Delete historic',
      message: 'Careful: This action is irreversible',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete confirmed');
            this.storageService.clearHistoric();

            this.showGames();
          }
        }
      ]
    });

    confirm.present();
  }

  public toLocaleDateString(d: string): string {

    return (new Date(d)).toLocaleDateString();
  }

  public toLocaleTimeString(d: string): string {

    return (new Date(d)).toLocaleTimeString();
  }

  public winner(left: number, right: number) {

    return left > right;
  }
}
