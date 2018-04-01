import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

import { Loop } from '../../loop';
import { BgProvider } from '../../../bg/providers/bg/bg';
import { ItemPage } from '../../item';

@Component({
  selector: 'page-loop',
  templateUrl: 'loop.html',
})
export class LoopPage extends ItemPage {
  loop: Loop
  to: number
  count: number
  constructor(
    viewCtrl: ViewController,
    bgProvider: BgProvider,
    navParams: NavParams
  ) {
    super(viewCtrl, bgProvider, LoopPage.getLoop(navParams))
    this.loop = this.item as Loop
    this.to = this.loop.to
    this.count = this.loop.count
  }

  static getLoop(navParams: NavParams): Loop {
    const loop = navParams.get('loop')
    return loop ? loop : { name: '未命名的重复任务', to: 0, count: 3 }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoopPage');
  }

  ok() {
    this.loop.count = this.count
    this.loop.to = this.to
    super.ok()
  }
}
