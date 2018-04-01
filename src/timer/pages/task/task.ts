import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { range } from 'lodash'

import { Task } from '../../task'
import { Sound } from '../../../sound/sound';
import { BgProvider } from '../../../bg/providers/bg/bg';
/**
 * 任务编辑
 */
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage {
  task: Task
  minute: number
  second: number
  sound: string
  sounds: Sound[]
  vibration: number = 0
  constructor(
    private viewCtrl: ViewController,
    private bgProvider: BgProvider,
    navParams: NavParams,
  ) {
    const task = navParams.get('task')
    this.task = task ? task : { name: '未命名的计时任务', time: 60, sound: 'ding' }
    this.second = this.task.time % 60
    this.minute = Math.floor(this.task.time / 60)
    this.sounds = this.bgProvider.sounds
    if (this.task.sound) { this.sound = this.task.sound }
    if (this.task.vibration) { this.vibration = this.task.vibration }
  }

  range(n: number) {
    return range(n)
  }

  cancel() {
    this.viewCtrl.dismiss(null)
  }

  ok() {
    this.task.time = this.minute * 60 + this.second
    if (this.sound) { this.task.sound = this.sound }
    this.task.vibration = this.vibration
    this.viewCtrl.dismiss(this.task)
  }

  play(sound: string) {
    this.bgProvider.playSound(sound)
  }

  vib(time: number) {
    this.bgProvider.vibrate(time)
  }
}
