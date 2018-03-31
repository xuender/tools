import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { PlanProvider } from '../../providers/plan/plan'
import { Plan } from '../../plan'
import { PlanPage } from '../../pages/plan/plan'

@Component({
  selector: 'page-timer',
  templateUrl: 'timer.html',
})
export class TimerPage {
  plans: Plan[]

  constructor(public navCtrl: NavController, public navParams: NavParams, private planProvider: PlanProvider) {
    this.plans = this.planProvider.plans
  }

  openPlan(plan: Plan) {
    this.navCtrl.push(PlanPage, { plan: plan });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimerPage');
  }
}
