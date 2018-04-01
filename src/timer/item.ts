import { ViewController } from 'ionic-angular';

import { BgProvider } from '../bg/providers/bg/bg';
import { Sound } from "../sound/sound";

/**
 * 项目
 */
export interface Item {
  /**
   * 名称
   */
  name: string
  /**
   * 成功
   */
  succeed?: boolean
  /**
   * 当前计数
   */
  num?: number
  /**
   * 音效
   */
  sound?: string
  /**
   * 震动
   */
  vibration?: number
}

/**
 * 判断是否是Loop
 * @param i 项目
 */
export function isLoop(i: Item): boolean {
  return 'count' in i
}

export class ItemPage {
  name: string
  sound: string
  sounds: Sound[]
  vibration: number = 0
  constructor(
    private viewCtrl: ViewController,
    private bgProvider: BgProvider,
    protected item: Item,
  ) {
    this.name = item.name
    this.sounds = this.bgProvider.sounds
    if (this.item.sound) { this.sound = this.item.sound }
    if (this.item.vibration) { this.vibration = this.item.vibration }
  }

  cancel() {
    this.viewCtrl.dismiss(null)
  }

  ok() {
    this.item.name = this.name
    if (this.sound) { this.item.sound = this.sound }
    this.item.vibration = this.vibration
    this.viewCtrl.dismiss(this.item)
  }

  play(sound: string) {
    this.bgProvider.playSound(sound)
  }

  vib(time: number) {
    this.bgProvider.vibrate(time)
  }
}
