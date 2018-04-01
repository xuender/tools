import { NgModule } from '@angular/core';
import { IonicModule, IonicPageModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http'
import { NativeAudio } from '@ionic-native/native-audio'
import { Vibration } from '@ionic-native/vibration'

import { SoundPage } from './pages/sound/sound';
import { SoundProvider } from './providers/sound/sound';

@NgModule({
  declarations: [
    SoundPage,
  ],
  imports: [
    HttpClientModule,
    IonicModule,
    IonicPageModule.forChild(SoundPage),
  ],
  providers: [
    NativeAudio,
    Vibration,
    SoundProvider,
  ],
})
export class SoundModule { }
