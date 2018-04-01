import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular'
import { IonicStorageModule } from '@ionic/storage'
import { HttpClientModule } from '@angular/common/http'

import { TimerComponent } from './components/timer/timer'
import { TimePipe } from './pipes/time/time'
import { PlanPage } from './pages/plan/plan'
import { TaskPage } from './pages/task/task'
import { LoopPage } from './pages/loop/loop'
import { PlanProvider } from './providers/plan/plan'
import { BgModule } from '../bg/bg.module';

@NgModule({
  declarations: [
    TimerComponent,
    TimePipe,
    PlanPage,
    TaskPage,
    LoopPage,
  ],
  imports: [
    HttpClientModule,
    IonicModule,
    BgModule,
    IonicStorageModule.forRoot({
      name: 'toolsdb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
  ],
  exports: [
    TimerComponent,
    TimePipe,
    PlanPage,
    TaskPage,
    LoopPage,
  ],
  providers: [
    PlanProvider,
  ],
  entryComponents: [
    PlanPage,
    TaskPage,
    LoopPage,
  ]
})
export class TimerModule { }
