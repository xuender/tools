import { Component } from '@angular/core';

import { ToolsPage } from '../tools/tools'
import { ServicePage } from '../service/service'
import { InfoPage } from '../info/info'
import { SettingsPage } from '../settings/settings'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ToolsPage
  tab2Root = ServicePage
  tab3Root = InfoPage
  tab4Root = SettingsPage

  constructor() {

  }
}
