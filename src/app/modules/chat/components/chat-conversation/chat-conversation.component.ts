import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ISendMessageItem } from '../../interfaces/chat.interface';
import { ChatBotMessageComponent } from './chat-bot-message/chat-bot-message.component';
import { ChatLoadingComponent } from './chat-loading/chat-loading.component';
import { ChatUserMessageComponent } from './chat-user-message/chat-user-message.component';

@Component({
  standalone: true,
  selector: 'chat-conversation',
  styleUrl: './chat-conversation.component.scss',
  templateUrl: './chat-conversation.component.html',
  imports: [
    ChatLoadingComponent,
    ChatBotMessageComponent,
    ChatUserMessageComponent,
  ],
})
export class ChatConversationComponent {
  @Input() loading: boolean = false;
  @Input({ required: true }) messages: ISendMessageItem[] = [];

  @ViewChild('conversationContainer', { static: false })
  conversationContainerEl!: ElementRef;

  public readonly botMessageRole: string = 'assistant';

  public getScrollPositionLastMessage(): number | null {
    const lastMessageEl =
      this.conversationContainerEl.nativeElement.lastElementChild;

    return lastMessageEl?.offsetTop || null;
  }
}
