import { Item } from './item'
/**
 * 任务
 */
export interface Loop extends Item {
  /**
   * 返回
   */
  to: number
  /**
   * 次数
   */
  count: number
}
