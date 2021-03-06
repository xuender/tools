import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ItemSliding } from 'ionic-angular'


import { Plan } from '../../plan'
import { Loop } from '../../loop'
import { Item, isLoop } from '../../item'
import { Task } from '../../task'
import { PlanProvider } from '../../providers/plan/plan';
import { BgProvider } from '../../../bg/providers/bg/bg';
import { LoopRun } from '../../../utils'

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
  private loopRun: LoopRun
  constructor(
    private planProvider: PlanProvider,
    private bgProvider: BgProvider,
  ) {
    console.log('Hello TimerComponent Component');
    this.loopRun = new LoopRun(l => {
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
    })
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
    this.loopRun.run()
    this.bgProvider.vibrate(100)
  }

  loop(l: Loop) {
    l.num += 1
    if (l.num >= l.count) {
      this.item(l)
    } else {
      for (let i = l.to; i < this.plan.items.length; i++) {
        const item = this.plan.items[i]
        if (item === l) { break }
        item.succeed = false
        item.num = 0
      }
    }
  }

  private item(i: Item) {
    i.succeed = true
    if (i.vibration) {
      this.bgProvider.vibrate(i.vibration)
    }
    if (i.sound) {
      this.bgProvider.playSound(i.sound)
    }
  }

  task(t: Task) {
    t.num += 1
    if (t.num >= t.time) {
      this.item(t)
    }
  }

  pause() {
    this.ifRun = true
    this.ifPause = false
    this.loopRun.stop()
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
    this.loopRun.stop()
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
