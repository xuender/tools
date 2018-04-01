import { Injectable } from '@angular/core';
import { isString } from 'lodash'

import { Sound } from '../../sound'
import { BgProvider } from '../../../bg/providers/bg/bg'
@Injectable()
export class SoundProvider {
  sounds: Sound[]
  constructor(
    private bgProvider: BgProvider,
  ) {
    console.log('Hello SoundProvider Provider');
    this.sounds = this.bgProvider.sounds
  }

  play(sound: Sound | string): Promise<any> {
    if (isString(sound)) {
      console.log('播放声音', sound)
      return this.bgProvider.playSound(sound as string)
    } else {
      return this.play((sound as Sound).code)
    }
  }
}
