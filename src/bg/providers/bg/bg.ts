import { Injectable } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio'
import { Vibration } from '@ionic-native/vibration'
import { HttpClient } from '@angular/common/http';
import { BackgroundMode } from '@ionic-native/background-mode'

import { Sound } from '../../../sound/sound'

@Injectable()
export class BgProvider {
  sounds: Sound[] = []
  private num = 0;

  constructor(
    private httpClient: HttpClient,
    private nativeAudio: NativeAudio,
    private vibration: Vibration,
    private backgroundMode: BackgroundMode,
  ) {
    this.httpClient.get('assets/json/sounds.json')
      .subscribe((res: Sound[]) => {
        for (const s of res) {
          console.log('code', s.code, s.path)
          this.loadSound(s)
        }
      })
  }

  loadSound(sound: Sound) {
    this.sounds.push(sound)
    this.nativeAudio.preloadSimple(sound.code, `assets/sounds/${sound.path}`)
      .then(a => {
        console.debug('onSuccess', a)
      }, e => {
        console.error('onError', e)
      })
  }

  playSound(code: string): Promise<any> {
    console.log('播放声音', code)
    return this.nativeAudio.play(code)
  }

  vibrate(time: number) {
    console.log('震动', time)
    this.vibration.vibrate(time)
  }

  enable() {
    console.log('启动后台执行')
    this.num += 1
    if (!this.backgroundMode.isEnabled) {
      this.backgroundMode.enable()
    }
  }

  disable() {
    console.log('关闭后台执行')
    this.num -= 1
    if (this.num < 0) { this.num = 0 }
    if (this.backgroundMode.isEnabled && this.num === 0) {
      this.backgroundMode.disable()
    }
  }
}
