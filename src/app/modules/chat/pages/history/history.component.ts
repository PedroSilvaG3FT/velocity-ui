import { Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../../../store/auth.store';
import { ChatFacede } from '../../facedes/chat.facede';
import { ISubjectItem } from '../../interfaces/chat.interface';
import { ChatService } from '../../services/chat.service';

@Component({
  imports: [],
  standalone: true,
  selector: 'chat-history',
  styleUrl: './history.component.scss',
  templateUrl: './history.component.html',
})
export class HistoryComponent {
  private submoduleId: number = 0;

  private router = inject(Router);
  private authStore = inject(AuthStore);
  private chatService = inject(ChatService);
  private chatFacede = inject(ChatFacede);

  public moduleName: string = '';
  public submoduleName: string = '';
  public subjects: ISubjectItem[] = [];

  constructor() {
    effect(() => {
      const isSubmoduleChanged =
        this.submoduleId !== this.chatFacede._store.selectedSubmoduleId();

      if (isSubmoduleChanged) {
        this.submoduleId = this.chatFacede._store.selectedSubmoduleId();

        this.getTitle();
        this.getSubjects();
      }
    });
  }

  public getTitle() {
    const currentModule = this.chatFacede.getModuleById(
      this.chatFacede._store.selectedModuleId()
    );

    if (currentModule) {
      const currentSubmodule = this.chatFacede.getSubmoduleById(
        currentModule,
        this.chatFacede._store.selectedSubmoduleId()
      );

      this.moduleName = currentModule?.name || '';
      this.submoduleName = currentSubmodule?.name || '';
    }
  }

  public getSubjects() {
    this.chatService
      .getSubjects(this.submoduleId, this.authStore.userData().id)
      .subscribe({
        next: (response) => {
          this.subjects = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public handleSelectSubject(item: ISubjectItem) {
    this.chatFacede._store.setSubjectId(item.id);
    this.router.navigate(['/chat']);
  }
}
