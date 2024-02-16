import { Component, Input, booleanAttribute, inject } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { ChatStore } from '../../../../../../store/chat.store';
import { AnimateDirective } from '../../../../../@shared/directives/animate.directive';
import { IChatSetupModuleItem } from '../../../../interfaces/chat-setup.interface';

@Component({
  standalone: true,
  selector: 'chat-side-menu-item',
  styleUrl: './side-menu-item.component.scss',
  imports: [AnimateDirective, MatTooltipModule],
  templateUrl: './side-menu-item.component.html',
})
export class SideMenuItemComponent {
  @Input({ transform: booleanAttribute }) isOpen = false;
  @Input({ required: true }) module: IChatSetupModuleItem =
    {} as IChatSetupModuleItem;

  public maxHeight: string = '';

  private router = inject(Router);
  public chatStore = inject(ChatStore);

  ngOnInit() {
    const count = this.module.submodules.reduce((acc) => acc + 48, 0);
    this.maxHeight = `${count}px`;
  }

  public handleUpdateSelection(moduleId: number, submoduleId: number) {
    this.chatStore.setModuleId(moduleId);
    this.chatStore.setSubmoduleId(submoduleId);
  }

  public handleToggleOpen() {
    this.isOpen = !this.isOpen;
  }

  public handleGoToHistory(moduleId: number, submoduleId: number) {
    this.handleUpdateSelection(moduleId, submoduleId);
    this.router.navigate(['/chat/history']);
  }

  public handleCreateNewChat(moduleId: number, submoduleId: number) {
    this.handleUpdateSelection(moduleId, submoduleId);
  }
}
