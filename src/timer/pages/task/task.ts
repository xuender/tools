import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { range } from 'lodash'

import { Task } from '../../task'
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
  constructor(
    private viewCtrl: ViewController,
    public navParams: NavParams
  ) {
    const task = navParams.get('task')
    this.task = task ? task : { name: '未命名的计时任务', time: 60 }
    this.second = this.task.time % 60
    this.minute = Math.floor(this.task.time / 60)
  }

  range(n: number) {
    return range(n)
  }

  cancel() {
    this.viewCtrl.dismiss(null)
  }

  ok() {
    this.task.time = this.minute * 60 + this.second
    this.viewCtrl.dismiss(this.task)
  }
}
