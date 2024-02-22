import { Component, inject } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { AuthStore } from '../../../../../store/auth.store';
import { ChatSetupStore } from '../../../../../store/chat-setup.store';
import { ChatStore } from '../../../../../store/chat.store';
import { AppThemeSelectionComponent } from '../../../../@shared/components/app-theme-selection/app-theme-selection.component';
import { IChatSetupModuleItem } from '../../../interfaces/chat-setup.interface';
import { SideMenuItemComponent } from './side-menu-item/side-menu-item.component';

@Component({
  standalone: true,
  selector: 'side-menu',
  styleUrl: './side-menu.component.scss',
  templateUrl: './side-menu.component.html',
  imports: [AppThemeSelectionComponent, SideMenuItemComponent, MatMenuModule],
})
export class SideMenuComponent {
  public authStore = inject(AuthStore);
  public chatStore = inject(ChatStore);
  public chatSetupStore = inject(ChatSetupStore);

  public modules: IChatSetupModuleItem[] = [];

  ngOnInit() {
    this.modules = this.chatSetupStore.modules();
  }
}
