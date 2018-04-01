import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { range } from 'lodash'

import { Task } from '../../task'
import { BgProvider } from '../../../bg/providers/bg/bg';
import { ItemPage } from '../../item';
/**
 * 任务编辑
 */
@Component({
  selector: 'page-task',
  templateUrl: 'task.html',
})
export class TaskPage extends ItemPage {
  task: Task
  minute: number
  second: number
  constructor(
    viewCtrl: ViewController,
    bgProvider: BgProvider,
    navParams: NavParams,
  ) {
    super(viewCtrl, bgProvider, TaskPage.getTask(navParams))
    this.task = this.item as Task
    this.second = this.task.time % 60
    this.minute = Math.floor(this.task.time / 60)
  }

  static getTask(navParams: NavParams): Task {
    const task = navParams.get('task')
    return task ? task : { name: '未命名的计时任务', time: 60, sound: 'ding' }
  }

  range(n: number) {
    return range(n)
  }

  ok() {
    this.task.time = this.minute * 60 + this.second
    super.ok()
  }
}
