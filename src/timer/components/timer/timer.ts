import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemSliding } from 'ionic-angular'


import { Plan } from '../../plan'
import { Loop } from '../../loop'
import { Item, isLoop } from '../../item'
import { Task } from '../../task'
import { PlanProvider } from '../../providers/plan/plan';
import { BgProvider } from '../../../bg/providers/bg/bg';

/**
 * 计时器
 */
@Component({
  selector: 'timer',
  templateUrl: 'timer.html'
})
export class TimerComponent {
  @Output('run') isRun: EventEmitter<boolean> = new EventEmitter<boolean>();
  ifPlay = true
  ifPause = false
  ifStop = false
  ifCancel = true
  ifRun = false
  time = 0

  private _plan: Plan
  private tplan: Plan
  private timer
  constructor(
    private planProvider: PlanProvider,
    private bgProvider: BgProvider,
  ) {
    console.log('Hello TimerComponent Component');
  }

  @Input() set plan(p: Plan) {
    this.tplan = p
    this._plan = Object.assign({}, p)
    this.init()
  }

  get plan() {
    return this._plan
  }

  init() {
    console.log('timer', this.plan)
    for (const i of this.plan.items) {
      i.succeed = false
      i.num = 0
    }
  }

  play() {
    this.bgProvider.enable()
    this.init()
    this.run()
  }

  run() {
    this.isRun.emit(true)
    this.ifPlay = false
    this.ifRun = false
    this.ifPause = true
    this.ifStop = true
    this.ifCancel = false
    this.timer = setInterval(() => {
      this.time += 1
      let end = true
      for (const i of this.plan.items) {
        if (!i.succeed) {
          end = false
          if (isLoop(i)) {
            this.loop(i as Loop)
          } else {
            this.task(i as Task)
          }
          break
        }
      }
      if (end) {
        this.stop()
        this.tplan.tally = this.tplan.tally ? this.tplan.tally + 1 : 1
        console.log('save', this.plan.tally)
        this.planProvider.save()
      }
    }, 1000)
    this.bgProvider.vibrate(100)
  }

  loop(l: Loop) {
    l.num += 1
    if (l.num >= l.count) {
      l.succeed = true
    } else {
      for (let i = l.to; i < this.plan.items.length; i++) {
        const item = this.plan.items[i]
        if (item === l) { break }
        item.succeed = false
        item.num = 0
      }
    }
  }

  task(t: Task) {
    t.num += 1
    if (t.num >= t.time) {
      t.succeed = true
      if (t.vibration) {
        this.bgProvider.vibrate(t.vibration)
      }
      if (t.sound) {
        this.bgProvider.playSound(t.sound)
      }
    }
  }

  pause() {
    this.ifRun = true
    this.ifPause = false
    if (this.timer) { clearInterval(this.timer) }
    this.bgProvider.vibrate(100)
  }

  stop() {
    this.bgProvider.disable()
    this.isRun.emit(false)
    this.ifPlay = true
    this.ifRun = false
    this.ifPause = false
    this.ifStop = false
    this.ifCancel = true
    if (this.timer) { clearInterval(this.timer) }
    this.time = 0
    this.init()
    this.bgProvider.vibrate(100)
    console.log('sotp 完毕')
  }

  updateItem(item: Item, slidingItem: ItemSliding) {
    if (isLoop(item)) {
      this.planProvider.updateLoop(item as Loop)
    } else {
      this.planProvider.updateTask(item as Task)
    }
    slidingItem.close();
  }

  removeItem(item: Item, slidingItem: ItemSliding) {
    this.planProvider.removeItem(this.plan, item)
    slidingItem.close();
  }
}
