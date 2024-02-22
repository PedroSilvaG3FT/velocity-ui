import { NgClass } from '@angular/common';
import { Component, Input, booleanAttribute, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AuthStore } from '../../../../../../store/auth.store';
import { ChatStore } from '../../../../../../store/chat.store';
import { AnimateDirective } from '../../../../../@shared/directives/animate.directive';
import { IChatSetupModuleItem } from '../../../../interfaces/chat-setup.interface';
import { ChatService } from '../../../../services/chat.service';
import { ModalSubjectComponent } from '../../../modal-subject/modal-subject.component';

@Component({
  standalone: true,
  selector: 'chat-side-menu-item',
  styleUrl: './side-menu-item.component.scss',
  templateUrl: './side-menu-item.component.html',
  imports: [NgClass, AnimateDirective, MatTooltipModule, ModalSubjectComponent],
})
export class SideMenuItemComponent {
  @Input({ transform: booleanAttribute }) isOpen = false;
  @Input({ required: true }) module: IChatSetupModuleItem =
    {} as IChatSetupModuleItem;

  public maxHeight: string = '';

  private router = inject(Router);

  public authStore = inject(AuthStore);
  public chatStore = inject(ChatStore);
  public chatService = inject(ChatService);

  constructor(public matDialog: MatDialog) {}

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

  public handleCreateNewChat(moduleId: number, idSubModule: number) {
    const dialogRef = this.matDialog.open(ModalSubjectComponent);

    dialogRef.afterClosed().subscribe((nameSubject) => {
      this.chatService
        .createSubject({
          nameSubject,
          idSubModule,
          idUser: this.authStore.userData().id,
        })
        .subscribe({
          next: (response) => {
            this.chatStore.setSubjectId(response.id);
            this.handleUpdateSelection(moduleId, idSubModule);

            console.log('RESPONSE : ', response);
          },
          error: (error) => {
            console.log('ERROR : ', error);
          },
        });
    });
  }
}
