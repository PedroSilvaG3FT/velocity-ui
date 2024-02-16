import { Component, Input } from '@angular/core';

@Component({
  imports: [],
  standalone: true,
  selector: 'chat-user-message',
  styleUrl: './chat-user-message.component.scss',
  templateUrl: './chat-user-message.component.html',
})
export class ChatUserMessageComponent {
  @Input({ required: true }) message: any = {};
}
