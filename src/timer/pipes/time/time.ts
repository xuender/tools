import { Pipe, PipeTransform } from '@angular/core';
import { isNumber } from 'lodash'

/**
 * 时间的自然语言显示
 */
@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: number, ...args) {
    if (!isNumber(value)) { return null }
    if (value === 0) { return args.length > 0 ? args[0] : '' }
    const h = Math.floor(value / 3600)
    const m = Math.floor(value % 3600 / 60)
    const s = value % 60
    const ret = []
    if (h) { ret.push(`${h} 小时`) }
    if (m) { ret.push(`${m} 分`) }
    if (s) { ret.push(`${s} 秒`) }
    return ret.join(' ')
  }
}
