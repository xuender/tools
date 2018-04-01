import { Item } from './item'
/**
 * 任务
 */
export interface Task extends Item {
  /**
   * 计时
   */
  time: number
}
