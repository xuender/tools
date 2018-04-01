// import { Task } from './task'
// import { Loop } from './loop'
import { Item } from './item';
/**
 * 计划
 */
export interface Plan {
  /**
   * 名称
   */
  name: string
  /**
   * 成功
   */
  succeed?: boolean
  /**
   * 子计划
   */
  plans?: Plan[]
  /**
   * 父级计划
   */
  parent?: Plan
  /**
   * 定时项目
   */
  items?: Array<Item>
  /**
   * 次数
   */
  tally?: number;
}

/**
 * 增加计划
 * @param parent 父计划
 * @param plan  子计划
 */
export function addPlan(parent: Plan, plan: Plan) {
  plan.parent = parent
  if (parent.plans) {
    parent.plans.push(plan)
  } else {
    parent.plans = [plan]
  }
}

/**
 * 增加项目
 * @param plan 计划
 * @param item 项目
 */
export function addItem(plan: Plan, item: Item) {
  item.num = 0
  item.succeed = false
  if (plan.items) {
    plan.items.push(item)
  } else {
    plan.items = [item]
  }
}
