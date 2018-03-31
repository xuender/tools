import { Component } from '@angular/core'
import {
  NavController,
  NavParams,
  ItemSliding,
  // ModalController
} from 'ionic-angular'
import { sum } from 'lodash'

import { Task } from '../../task'
import { Plan } from '../../plan'
import { isLoop } from '../../item'
import { PlanProvider } from '../../providers/plan/plan'
import { Loop } from '../../loop';
/**
 * 计划页面
 */
@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html',
})
export class PlanPage {
  isRun = false
  plan: Plan

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private modalCtrl: ModalController,
    private planProvider: PlanProvider
  ) {
    this.plan = navParams.get('plan')
  }

  time(plan: Plan): number {
    if (plan.items && plan.items.length > 0) {
      const ns = []
      for (let i = 0; i < plan.items.length; i++) {
        const item = plan.items[i]
        if (isLoop(item)) {
          const loop = item as Loop
          ns.push(sum(ns.slice(loop.to, i)) * (loop.count - 1))
        } else {
          ns.push((item as Task).time)
        }
      }
      return sum(ns)
    } else {
      return null
    }
  }

  changeRun(run: boolean) {
    this.isRun = run
  }

  ionViewDidLoad() {
    console.log('PlanPage', this.plan)
  }

  openPlan(plan: Plan) {
    plan.parent = this.plan
    this.navCtrl.push(PlanPage, { plan: plan })
  }

  add() {
    this.planProvider.add(this.plan).then(p => {
      if (p) {
        p.parent = this.plan
        this.navCtrl.push(PlanPage, { plan: p })
      }
    })
  }

  get ifPlan(): boolean {
    return this.plan.plans && this.plan.plans.length > 0
  }

  get ifItem(): boolean {
    return this.plan.items && this.plan.items.length > 0
  }

  updatePlan(plan: Plan, slidingItem: ItemSliding) {
    this.planProvider.updatePlan(plan)
    slidingItem.close();
  }

  removePlan(plan: Plan, slidingItem: ItemSliding) {
    plan.parent = this.plan
    this.planProvider.removePlan(plan)
    slidingItem.close();
  }
}
