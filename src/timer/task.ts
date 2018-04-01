import { Item } from './item'
/**
 * 任务
 */
export interface Task extends Item {
  /**
   * 计时
   */
  time: number
  /**
   * 音效
   */
  sound?: string
  /**
   * 震动
   */
  vibration?: number
}
