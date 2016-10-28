import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PlayPage } from '../pages/play/play';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { HistoricPage } from '../pages/historic/historic';
import { StorageService } from '../providers/storage-service';

@NgModule({
  declarations: [
    MyApp,
    PlayPage,
    ItemDetailsPage,
    HistoricPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PlayPage,
    ItemDetailsPage,
    HistoricPage
  ],
  providers: [StorageService]
})
export class AppModule {}
