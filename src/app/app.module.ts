import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

// import { ColorPickerModule } from 'angular2-color-picker';

import { MyApp } from './app.component';
import { PlayPage } from '../pages/play/play';
import { PlayerPage } from '../pages/player/player';
import { AddPlayerPage } from '../pages/add-player/add-player';
import { HistoricPage } from '../pages/historic/historic';
import { StorageService } from '../providers/storage-service';

@NgModule({
  declarations: [
    MyApp,
    PlayPage,
    PlayerPage,
    AddPlayerPage,
    HistoricPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    // ColorPickerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PlayPage,
    PlayerPage,
    AddPlayerPage,
    HistoricPage
  ],
  providers: [StorageService]
})
export class AppModule {}
