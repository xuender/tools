import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { ToolsPage } from '../pages/tools/tools'
import { ServicePage } from '../pages/service/service'
import { InfoPage } from '../pages/info/info'
import { SettingsPage } from '../pages/settings/settings'

import { TimerModule } from '../timer/timer.module'
@NgModule({
  declarations: [
    MyApp,

    ToolsPage,
    ServicePage,
    InfoPage,
    SettingsPage,

    TabsPage,
  ],
  imports: [
    BrowserModule,
    TimerModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '后退',
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    ToolsPage,
    ServicePage,
    InfoPage,
    SettingsPage,

    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
  ]
})
export class AppModule { }
