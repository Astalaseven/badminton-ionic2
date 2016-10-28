import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { StorageService } from '../../providers/storage-service';


@Component({
  templateUrl: 'historic.html'
})
export class HistoricPage {
  selectedItem: any;
  icons: string[];
  // items: Array<{sets: [], date: Date}>;
  items: any;

  constructor(public storageService: StorageService) {

    this.storageService.getHistoric()
      .then(
      data => {
        console.log('historic');
        console.log(data);
        this.items = data;
      },
      error => {
        console.log(error);
      }
      );

  }

  public toLocaleDateString(d: string): string {
    return (new Date(d)).toLocaleDateString();
  }
  
  public toLocaleTimeString(d: string): string {
    return (new Date(d)).toLocaleTimeString();
  }
}
