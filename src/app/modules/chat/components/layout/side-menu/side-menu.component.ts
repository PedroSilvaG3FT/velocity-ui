import { Component, inject } from '@angular/core';
import { ChatSetupStore } from '../../../../../store/chat-setup.store';
import { ChatStore } from '../../../../../store/chat.store';
import { AppThemeSelectionComponent } from '../../../../@shared/components/app-theme-selection/app-theme-selection.component';
import { IChatSetupModuleItem } from '../../../interfaces/chat-setup.interface';

@Component({
  standalone: true,
  selector: 'side-menu',
  imports: [AppThemeSelectionComponent],
  styleUrl: './side-menu.component.scss',
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent {
  private chatStore = inject(ChatStore);
  public chatSetupStore = inject(ChatSetupStore);

  public modules: IChatSetupModuleItem[] = [];

  ngOnInit() {}
}
