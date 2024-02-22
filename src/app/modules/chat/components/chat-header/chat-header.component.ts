import { Component, effect, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatSetupStore } from '../../../../store/chat-setup.store';
import { ChatStore } from '../../../../store/chat.store';
import { AppSelectComponent } from '../../../@shared/components/form/app-select/app-select.component';
import { IFormOption } from '../../../@shared/interfaces/app-form.interface';
import { IChatSetupOptionsItem } from '../../interfaces/chat-setup.interface';

@Component({
  standalone: true,
  selector: 'chat-header',
  styleUrl: './chat-header.component.scss',
  imports: [AppSelectComponent, FormsModule],
  templateUrl: './chat-header.component.html',
})
export class ChatHeaderComponent {
  private chatStore = inject(ChatStore);
  private chatSetupStore = inject(ChatSetupStore);

  public ides: IFormOption[] = [];
  public languages: IFormOption[] = [];
  public frameworks: IFormOption[] = [];

  public ide: number = 0;
  public language: number = 0;
  public framework: number = 0;

  constructor() {
    effect(() => {
      this.initOptions();
    });
  }

  private initOptions() {
    const _buildOptions = (data: IChatSetupOptionsItem[]): IFormOption[] => {
      return data.map((item) => ({ label: item.name, value: item.id }));
    };

    this.ides = _buildOptions(this.chatSetupStore.ides());
    this.languages = _buildOptions(this.chatSetupStore.languages());
    this.frameworks = _buildOptions(this.chatSetupStore.frameworks());

    this.ide = this.chatStore.selectedIdeId();
    this.language = this.chatStore.selectedLanguageId();
    this.framework = this.chatStore.selectedFrameworkId();
  }

  public handleOptionChange() {
    this.chatStore.setIdeId(this.ide);
    this.chatStore.setLanguageId(this.language);
    this.chatStore.setFrameworkId(this.framework);
  }
}
