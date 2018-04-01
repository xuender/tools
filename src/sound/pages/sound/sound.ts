import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SoundProvider } from '../../providers/sound/sound';
import { Sound } from '../../sound';

@Component({
  selector: 'page-sound',
  templateUrl: 'sound.html',
})
export class SoundPage {
  sounds: Sound[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private soundProvider: SoundProvider
  ) {
    this.sounds = this.soundProvider.sounds
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SoundPage');
  }

  async play(sound: Sound) {
    sound.isPlay = true
    try {
      await this.soundProvider.play(sound)
    } catch (error) {
      console.error(error)
    }
    sound.isPlay = false
  }
}
