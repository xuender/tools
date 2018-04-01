import { HttpClient } from '@angular/common/http'
import { AlertController, ModalController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import { pull } from 'lodash'

import { TaskPage } from '../../pages/task/task'
import { LoopPage } from '../../pages/loop/loop'
import { Plan, addItem, addPlan } from '../../plan'
import { Task } from '../../task'
import { Loop } from '../../loop'
import { Item } from '../../item';

@Injectable()
export class PlanProvider {
  plans: Plan[] = []

  constructor(
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private httpClient: HttpClient,
    private storage: Storage
  ) {
    this.init()
  }

  private async init() {
    const plans = await this.storage.get('plans')
    console.log('plans', plans)
    if (plans) {
      Object.assign(this.plans, plans)
    } else {
      this.httpClient.get('assets/json/plans.json')
        .subscribe((res: Plan[]) => {
          Object.assign(this.plans, res)
          this.save()
        })
    }
  }

  save() {
    this.storage.set('plans', this.plans)
  }

  private createPlan(): Promise<Plan> {
    return new Promise<Plan>(resolve => {
      this.alertCtrl.create({
        title: '创建任务',
        message: '请输入任务名称',
        inputs: [{ name: 'name', placeholder: '任务名称' }],
        buttons: [{ text: '取消' },
        {
          text: '保存',
          handler: data => {
            resolve(data)
          }
        }],
      }).present()
    })
  }

  updatePlan(plan: Plan): Promise<Plan> {
    return new Promise<Plan>(resolve => {
      this.alertCtrl.create({
        title: '修改任务',
        message: '请输入新任务名称',
        inputs: [{ name: 'name', placeholder: '任务名称', value: plan.name }],
        buttons: [{ text: '取消' },
        {
          text: '保存',
          handler: data => {
            plan.name = data.name
            this.save()
            resolve(plan)
          }
        }],
      }).present()
    })
  }

  removePlan(plan: Plan): Promise<Boolean> {
    return new Promise<Boolean>(resolve => {
      this.alertCtrl.create({
        title: '删除任务',
        message: `是否确实删除${plan.parent ? '子' : ''}任务 [ ${plan.name} ] ?`,
        buttons: [
          {
            text: '不删除',
            role: 'cancel',
            handler: () => resolve(false),
          },
          {
            text: '删除',
            handler: () => {
              pull(plan.parent ? plan.parent.plans : this.plans, plan)
              this.save()
              resolve(true)
            }
          }
        ]
      }).present()
    })
  }

  removeItem(plan: Plan, item: Item): Promise<Boolean> {
    return new Promise<Boolean>(resolve => {
      this.alertCtrl.create({
        title: '删除任务',
        message: `是否确实删除项目 [ ${item.name} ] ?`,
        buttons: [
          {
            text: '不删除',
            role: 'cancel',
            handler: () => resolve(false),
          },
          {
            text: '删除',
            handler: () => {
              pull(plan.items, item)
              this.save()
              resolve(true)
            }
          }
        ]
      }).present()
    })
  }

  async add(plan: Plan, isRoot = false): Promise<Plan> {
    if (plan.plans && plan.plans.length > 0) {
      const p = await this.createPlan()
      addPlan(plan, p)
      if (isRoot) {
        this.plans.push(p)
      }
      this.save()
      return p
    } else {
      const t = await this.creteItem(plan)
      switch (t) {
        case 'plan':
          const p = await this.createPlan()
          addPlan(plan, p)
          this.save()
          return p
        case 'task':
          addItem(plan, await this.createTask())
          break
        case 'loop':
          addItem(plan, await this.createLoop())
          break
      }
    }
    this.save()
    return null
  }

  private creteItem(plan: Plan): Promise<string> {
    console.log('createItem', plan)
    return new Promise<string>(resolve => {
      const a = this.alertCtrl.create({
        title: '选择项类型?',
        message: '子项目有多种类型可以选择',
        buttons: [{ text: '取消' },
        { text: '确定', handler: resolve }]
      })
      if ((!plan.plans && !plan.items) || (plan.plans && plan.plans.length > 0)) {
        a.addInput({
          type: 'radio',
          label: '子项目',
          value: 'plan',
          checked: false,
        })
      }
      if (!plan.plans || plan.plans.length === 0) {
        a.addInput({
          type: 'radio',
          label: '计时',
          value: 'task',
          checked: true,
        })
        if (plan.items && plan.items.length > 0) {
          a.addInput({
            type: 'radio',
            label: '循环',
            value: 'loop',
            checked: false,
          })
        }
      }
      a.present()
    })
  }

  private createTask(): Promise<Task> {
    return new Promise<Task>(resolve => {
      const tm = this.modalCtrl.create(TaskPage)
      tm.onDidDismiss(resolve)
      tm.present()
    })
  }

  private createLoop(): Promise<Loop> {
    return new Promise<Loop>(resolve => {
      const tm = this.modalCtrl.create(LoopPage)
      tm.onDidDismiss(resolve)
      tm.present()
    })
  }

  updateTask(task: Task): Promise<Task> {
    return new Promise<Task>(resolve => {
      const tm = this.modalCtrl.create(TaskPage, { task: task })
      tm.onDidDismiss(t => {
        this.save()
        resolve(t)
      })
      tm.present()
    })
  }

  updateLoop(loop: Loop): Promise<Loop> {
    return new Promise<Loop>(resolve => {
      const tm = this.modalCtrl.create(LoopPage, { loop: loop })
      tm.onDidDismiss(l => {
        this.save()
        resolve(l)
      })
      tm.present()
    })
  }
}
