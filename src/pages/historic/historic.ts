import { Component } from '@angular/core';

import { Game, StorageService } from '../../providers/storage-service';


@Component({
  templateUrl: 'historic.html'
})
export class HistoricPage {

  items: any[];

  constructor(public storageService: StorageService) {

    this.storageService.getHistoric()
      .then(
      data => {
        this.items = data;
        this.sortByDateDescending();
      },
      error => {
        console.log(error);
      }
      );

  }

  public sortByDateAscending() {

    this.items = this.items.sort(function (a, b) {

      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });
  }

  public sortByDateDescending() {

    this.items = this.items.sort(function (a, b) {

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }

  public toLocaleDateString(d: string): string {

    return (new Date(d)).toLocaleDateString();
  }

  public toLocaleTimeString(d: string): string {

    return (new Date(d)).toLocaleTimeString();
  }
}
