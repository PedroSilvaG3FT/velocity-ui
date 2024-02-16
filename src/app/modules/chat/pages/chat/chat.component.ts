import { Component, effect, inject } from '@angular/core';
import { AuthStore } from '../../../../store/auth.store';
import { ChatStore } from '../../../../store/chat.store';
import { ChatConversationComponent } from '../../components/chat-conversation/chat-conversation.component';
import { ChatFooterComponent } from '../../components/chat-footer/chat-footer.component';
import { ChatHeaderComponent } from '../../components/chat-header/chat-header.component';
import { ChatService } from '../../services/chat.service';

@Component({
  standalone: true,
  selector: 'app-chat',
  styleUrl: './chat.component.scss',
  templateUrl: './chat.component.html',
  imports: [
    ChatHeaderComponent,
    ChatFooterComponent,
    ChatConversationComponent,
  ],
})
export class ChatComponent {
  private subjectId: number = 0;
  private submoduleId: number = 0;

  public messages: any[] = [];

  private chatService = inject(ChatService);

  private authStore = inject(AuthStore);
  private chatStore = inject(ChatStore);

  constructor() {
    effect(() => {
      const isSubjectChanged =
        this.submoduleId !== this.chatStore.selectedSubmoduleId();

      const isSubmoduleChanged =
        this.submoduleId !== this.chatStore.selectedSubmoduleId();

      if (isSubjectChanged || isSubmoduleChanged) {
        this.subjectId = this.chatStore.selectedSubjectId();
        this.submoduleId = this.chatStore.selectedSubmoduleId();

        this.init();
      }
    });
  }

  private init() {
    console.log('GET SUBMODULES :', this.submoduleId);
    this.getMessages();
  }

  public getMessages() {
    this.chatService.getMessages(this.subjectId).subscribe({
      next: (response) => {
        this.messages = response;
        console.log('MESSAGES : ', response);
      },
      error: (error) => {
        console.log('ERROR : ', error);
      },
    });
  }

  public handleSearch(prompt: string) {
    this.chatService
      .sendMessage({
        idUser: this.authStore.userData().id,
        idIDE: this.chatStore.selectedIdeId(),
        idModule: this.chatStore.selectedModuleId(),
        idSubject: this.chatStore.selectedSubjectId(),
        idLanguage: this.chatStore.selectedLanguageId(),
        idSubModule: this.chatStore.selectedSubmoduleId(),
        idFramework: this.chatStore.selectedFrameworkId(),
        message: [{ role: 'system', content: '```' + prompt + '```' }],
      })
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
