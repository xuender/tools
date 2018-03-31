import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'
import { IonicStorageModule } from '@ionic/storage'
import { HttpClientModule } from '@angular/common/http'

import { TimerComponent } from './components/timer/timer'
import { TimePipe } from './pipes/time/time'
import { TimerPage } from './pages/timer/timer'
import { PlanPage } from './pages/plan/plan'
import { TaskPage } from './pages/task/task'
import { LoopPage } from './pages/loop/loop'
import { PlanProvider } from './providers/plan/plan'

@NgModule({
  declarations: [
    TimerComponent,
    TimePipe,
    TimerPage,
    PlanPage,
    TaskPage,
    LoopPage,
  ],
  imports: [
    HttpClientModule,
    IonicModule,
    IonicStorageModule.forRoot({
      name: 'toolsdb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
  ],
  exports: [
    TimerComponent,
    TimePipe,
    TimerPage,
    PlanPage,
    TaskPage,
    LoopPage,
  ],
  providers: [
    PlanProvider,
  ],
  entryComponents: [
    TimerPage,
    PlanPage,
    TaskPage,
    LoopPage,
  ]
})
export class TimerModule { }
