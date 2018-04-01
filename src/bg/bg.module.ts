import { NgModule } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio'
import { Vibration } from '@ionic-native/vibration'
import { HttpClientModule } from '@angular/common/http'
import { BackgroundMode } from '@ionic-native/background-mode'

import { BgProvider } from './providers/bg/bg';

@NgModule({
  imports: [
    HttpClientModule,
  ],
  providers: [
    NativeAudio,
    Vibration,
    BackgroundMode,
    BgProvider,
  ],
})
export class BgModule { }
