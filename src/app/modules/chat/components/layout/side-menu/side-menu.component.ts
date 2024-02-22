import { Component, effect, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthStore } from '../../../../../store/auth.store';
import { ChatSetupStore } from '../../../../../store/chat-setup.store';
import { ChatStore } from '../../../../../store/chat.store';
import { AppThemeSelectionComponent } from '../../../../@shared/components/app-theme-selection/app-theme-selection.component';
import { AuthenticationService } from '../../../../authentication/services/authentication.service';
import { IChatSetupModuleItem } from '../../../interfaces/chat-setup.interface';
import { SideMenuItemComponent } from './side-menu-item/side-menu-item.component';

@Component({
  standalone: true,
  selector: 'side-menu',
  styleUrl: './side-menu.component.scss',
  templateUrl: './side-menu.component.html',
  imports: [
    AppThemeSelectionComponent,
    SideMenuItemComponent,
    MatMenuModule,
    MatIconModule,
  ],
})
export class SideMenuComponent {
  public authStore = inject(AuthStore);
  public chatStore = inject(ChatStore);
  public chatSetupStore = inject(ChatSetupStore);

  public authenticationService = inject(AuthenticationService);

  public modules: IChatSetupModuleItem[] = [];

  constructor() {
    effect(() => {
      this.modules = this.chatSetupStore.modules();
    });
  }

  public handleLogout() {
    this.authenticationService.logout();
  }
}
