import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TimerPage } from '../../timer/pages/timer/timer'

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
    this.navCtrl.push(TimerPage)
  }
}
