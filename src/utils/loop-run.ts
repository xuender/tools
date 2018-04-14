/**
 * 定时循环执行
 */
export class LoopRun {
  private start: number
  private num = 0
  private intervalTimer: any
  /**
   * @param runnable 循环执行的函数
   * @param millisec 间隔毫秒
   * @param count 循环次数,默认-1不停止
   */
  constructor(
    private runnable: (loop: LoopRun) => void,
    private _millisec = 1000,
    private count = -1,
  ) { }

  get millisec(): number {
    return this._millisec
  }

  set millisec(millisec: number) {
    this.init()
    this._millisec = millisec
  }

  private init() {
    this.start = new Date().getTime()
    this.num = 0;
  }

  /**
   * 运行
   */
  run() {
    this.init()
    this.setTimeout(this._millisec)
  }

  private setTimeout(millisec: number) {
    this.intervalTimer = setTimeout(() => { this.doRun() }, millisec)
  }

  private doRun() {
    if (this.count === 0) { return }
    this.count -= 1
    this.num += 1
    const offset = new Date().getTime() - (this.num * this._millisec + this.start)
    const nextTime = this._millisec < offset ? 0 : this._millisec - offset
    //console.log('offset', offset, nextTime)
    this.setTimeout(nextTime)
    this.runnable(this)
  }

  /**
   * 停止
   */
  stop() {
    if (this.intervalTimer) {
      clearInterval(this.intervalTimer)
      this.intervalTimer = void 0
    }
  }
}
