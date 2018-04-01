import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';

import { SoundPage } from './pages/sound/sound';
import { SoundProvider } from './providers/sound/sound';
import { BgModule } from '../bg/bg.module';

@NgModule({
  declarations: [
    SoundPage,
  ],
  imports: [
    IonicModule,
    BgModule,
    IonicPageModule.forChild(SoundPage),
  ],
  providers: [
    SoundProvider,
  ],
})
export class SoundModule { }
