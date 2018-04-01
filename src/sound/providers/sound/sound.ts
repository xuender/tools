import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio'
import { Vibration } from '@ionic-native/vibration'
import { isString } from 'lodash'

import { Sound } from '../../sound'
@Injectable()
export class SoundProvider {
  sounds: Sound[] = []
  constructor(
    private nativeAudio: NativeAudio,
    private vibration: Vibration,
    private httpClient: HttpClient
  ) {
    console.log('Hello SoundProvider Provider');
    this.httpClient.get('assets/json/sounds.json')
      .subscribe((res: Sound[]) => {
        Object.assign(this.sounds, res)
        for (const s of this.sounds) {
          console.log('code', s.code, s.path)
          this.nativeAudio.preloadSimple(s.code, `assets/sounds/${s.path}`)
            .then(this.preloadOnSuccess, this.preloadOnError)
        }
      })
  }

  private preloadOnSuccess(a: any) {
    console.log('onSuccess', a)
  }

  private preloadOnError(a: any) {
    console.log('onError', a)
  }

  play(sound: Sound | string): Promise<any> {
    if (isString(sound)) {
      console.log('播放声音', sound)
      return this.nativeAudio.play(sound as string)
    } else {
      return this.play((sound as Sound).code)
    }
  }

  vib(time: number) {
    console.log('震动', time)
    this.vibration.vibrate(time)
  }
}
