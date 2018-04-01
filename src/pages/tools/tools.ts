import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

// import { TimerPage } from '../../timer/pages/timer/timer'
import { SoundPage } from '../../sound/pages/sound/sound'
import { PlanPage } from '../../timer/pages/plan/plan';

@Component({
  selector: 'page-tools',
  templateUrl: 'tools.html',
})
export class ToolsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ToolsPage');
  }

  timer() {
    this.navCtrl.push(PlanPage)
  }

  sound() {
    this.navCtrl.push(SoundPage)
  }
}
