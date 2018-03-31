/**
 * 项目
 */
export interface Item {
  /**
   * 名称
   */
  name: string
  /**
   * 成功
   */
  succeed?: boolean
  /**
   * 当前计数
   */
  num?: number
}

/**
 * 判断是否是Loop
 * @param i 项目
 */
export function isLoop(i: Item): boolean {
  return 'count' in i
}
