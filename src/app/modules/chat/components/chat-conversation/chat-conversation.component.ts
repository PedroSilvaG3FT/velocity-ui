import { Component, Input } from '@angular/core';
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
  @Input({ required: true }) typingEffectFunction: Function = () => {};

  public readonly botMessageRole: string = 'assistant';
}
