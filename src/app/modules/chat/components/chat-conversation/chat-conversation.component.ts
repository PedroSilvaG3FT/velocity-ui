import { Component, Input } from '@angular/core';
import { ChatBotMessageComponent } from './chat-bot-message/chat-bot-message.component';
import { ChatUserMessageComponent } from './chat-user-message/chat-user-message.component';

@Component({
  standalone: true,
  selector: 'chat-conversation',
  styleUrl: './chat-conversation.component.scss',
  templateUrl: './chat-conversation.component.html',
  imports: [ChatUserMessageComponent, ChatBotMessageComponent],
})
export class ChatConversationComponent {
  @Input({ required: true }) messages: any[] = [];

  public readonly botMessageRole: string = 'assistant';
}
