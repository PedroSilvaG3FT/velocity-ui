import { Component } from '@angular/core';
import { AppSelectComponent } from '../../../@shared/components/form/app-select/app-select.component';
import { APP_FRAMEWORKS_ITEMS } from '../../../@shared/constants/frameworks.constant';
import { APP_IDE_ITEMS } from '../../../@shared/constants/ide.constant';
import { APP_PROGRAMMING_LANGUAGES_ITEMS } from '../../../@shared/constants/programming-languages.constant';

@Component({
  standalone: true,
  selector: 'chat-header',
  imports: [AppSelectComponent],
  styleUrl: './chat-header.component.scss',
  templateUrl: './chat-header.component.html',
})
export class ChatHeaderComponent {
  public readonly ides = APP_IDE_ITEMS;
  public readonly frameworks = APP_FRAMEWORKS_ITEMS;
  public readonly languages = APP_PROGRAMMING_LANGUAGES_ITEMS;

  public ide: number = 0;
  public language: number = 0;
  public framework: number = 0;
}
