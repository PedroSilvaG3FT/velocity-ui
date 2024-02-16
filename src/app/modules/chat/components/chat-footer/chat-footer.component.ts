import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  Component,
  EventEmitter,
  NgZone,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { take } from 'rxjs';

@Component({
  standalone: true,
  selector: 'chat-footer',
  encapsulation: ViewEncapsulation.None,
  styleUrl: './chat-footer.component.scss',
  templateUrl: './chat-footer.component.html',
  imports: [FormsModule, MatInputModule, MatFormFieldModule],
})
export class ChatFooterComponent {
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;

  @Output() onSearch = new EventEmitter();

  public model: string = ``;

  constructor(private _ngZone: NgZone) {}

  public triggerResize() {
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  public handleSearch() {
    this.onSearch.emit(this.model);
    this.model = '';
  }
}
