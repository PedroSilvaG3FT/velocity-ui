import { Component, Input } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';
import { TypingEffectDirective } from '../../../directives/typing-effect.directive';
import { ISendMessageItem } from '../../../interfaces/chat.interface';

@Component({
  standalone: true,
  selector: 'chat-bot-message',
  styleUrl: './chat-bot-message.component.scss',
  templateUrl: './chat-bot-message.component.html',
  imports: [MarkdownComponent, TypingEffectDirective],
})
export class ChatBotMessageComponent {
  @Input({ required: true }) message: ISendMessageItem = {} as ISendMessageItem;

  public clipboardButtonText: string = 'Copy';

  public handleCopy() {
    this.clipboardButtonText = 'Copied';
    setTimeout(() => (this.clipboardButtonText = 'Copy'), 2000);
  }
}
