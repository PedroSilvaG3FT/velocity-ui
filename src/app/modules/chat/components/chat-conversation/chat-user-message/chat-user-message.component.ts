import { Component, Input } from '@angular/core';
import { ISendMessageItem } from '../../../interfaces/chat.interface';

@Component({
  imports: [],
  standalone: true,
  selector: 'chat-user-message',
  styleUrl: './chat-user-message.component.scss',
  templateUrl: './chat-user-message.component.html',
})
export class ChatUserMessageComponent {
  @Input({ required: true }) message: ISendMessageItem = {} as ISendMessageItem;
}
