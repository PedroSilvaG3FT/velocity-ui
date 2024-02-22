import {
  Component,
  ElementRef,
  ViewChild,
  effect,
  inject,
} from '@angular/core';
import { AuthStore } from '../../../../store/auth.store';
import { ChatStore } from '../../../../store/chat.store';
import { ObjectUtil } from '../../../@shared/util/object.util';
import { ChatConversationComponent } from '../../components/chat-conversation/chat-conversation.component';
import { ChatFooterComponent } from '../../components/chat-footer/chat-footer.component';
import { ChatHeaderComponent } from '../../components/chat-header/chat-header.component';
import { ISendMessageItem } from '../../interfaces/chat.interface';
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
  @ViewChild('conversationContainer', { static: false })
  conversationContainerEl!: ElementRef;

  private subjectId: number = 0;
  private submoduleId: number = 0;

  public messagesData: any[] = [];
  public isLoading: boolean = false;
  public messages: ISendMessageItem[] = [];

  private authStore = inject(AuthStore);
  private chatStore = inject(ChatStore);
  private chatService = inject(ChatService);

  public typingEffectFunction: Function = () => {
    setTimeout(() => {
      if (this.conversationContainerEl) {
        const element = this.conversationContainerEl.nativeElement;
        element.scrollTop = element.scrollHeight;
      }
    }, 750);
  };

  constructor() {
    effect(() => {
      const isSubjectChanged =
        this.subjectId !== this.chatStore.selectedSubmoduleId();

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
        const cloneMessages = ObjectUtil.clone(response);

        this.messagesData = response;
        this.messages = cloneMessages.map((item) => ({
          role: item.Role,
          content: item.Content,
        }));

        console.log('RESPONSE : ', response);
        console.log('MESSAGES : ', this.messages);
      },
      error: (error) => {
        console.log('ERROR : ', error);
      },
    });
  }

  public handleSearch(prompt: string) {
    this.messages.push({ role: 'system', content: prompt });
    this.isLoading = true;

    this.onMessageCreated();

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
        next: ({ content }) => {
          this.isLoading = false;
          this.messages.push({ role: 'assistant', content });

          this.onMessageCreated();
        },
        error: (error) => {
          const errorMessage = error.message;

          console.log('ERROR :', error);
          this.isLoading = false;
        },
      });
  }

  public onMessageCreated() {
    this.typingEffectFunction();
  }
}
