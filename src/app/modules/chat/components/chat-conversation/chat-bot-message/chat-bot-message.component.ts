import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'chat-bot-message',
  styleUrl: './chat-bot-message.component.scss',
  templateUrl: './chat-bot-message.component.html',
})
export class ChatBotMessageComponent {
  @Input({ required: true }) message: any = {};
}
