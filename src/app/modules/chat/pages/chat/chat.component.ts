import { Component } from '@angular/core';
import { ChatFooterComponent } from '../../components/chat-footer/chat-footer.component';
import { ChatHeaderComponent } from '../../components/chat-header/chat-header.component';

@Component({
  standalone: true,
  selector: 'app-chat',
  styleUrl: './chat.component.scss',
  templateUrl: './chat.component.html',
  imports: [ChatHeaderComponent, ChatFooterComponent],
})
export class ChatComponent {}
