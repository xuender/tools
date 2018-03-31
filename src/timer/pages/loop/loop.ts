import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Loop } from '../../loop';

@Component({
  selector: 'page-loop',
  templateUrl: 'loop.html',
})
export class LoopPage {
  loop: Loop
  constructor(
    private viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    const loop = navParams.get('loop')
    this.loop = loop ? loop : { name: '未命名的重复任务', to: 0, count: 3 }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoopPage');
  }

  cancel() {
    this.viewCtrl.dismiss(null)
  }

  ok() {
    this.viewCtrl.dismiss(this.loop)
  }
}
