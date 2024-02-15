import { Component, inject } from '@angular/core';
import { ChatSetupStore } from '../../../../../store/chat-setup.store';
import { ChatStore } from '../../../../../store/chat.store';
import { AppThemeSelectionComponent } from '../../../../@shared/components/app-theme-selection/app-theme-selection.component';
import {
  ISideMenuItemSelectedOutput,
  SideMenuItemComponent,
} from './side-menu-item/side-menu-item.component';

@Component({
  standalone: true,
  selector: 'side-menu',
  styleUrl: './side-menu.component.scss',
  templateUrl: './side-menu.component.html',
  imports: [AppThemeSelectionComponent, SideMenuItemComponent],
})
export class SideMenuComponent {
  public chatStore = inject(ChatStore);
  public chatSetupStore = inject(ChatSetupStore);

  ngOnInit() {}

  public handleSelectSubmodule(event: ISideMenuItemSelectedOutput) {
    this.chatStore.setModuleId(event.moduleId);
    this.chatStore.setSubmoduleId(event.submoduleId);
  }
}
