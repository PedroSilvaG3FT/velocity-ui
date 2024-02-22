import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { AppInputComponent } from '../../../@shared/components/form/app-input/app-input.component';

@Component({
  standalone: true,
  selector: 'chat-modal-subject',
  styleUrl: './modal-subject.component.scss',
  templateUrl: './modal-subject.component.html',
  imports: [
    FormsModule,
    MatDialogTitle,
    MatDialogClose,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    AppInputComponent,
  ],
})
export class ModalSubjectComponent {
  public subject: string = '';

  constructor(public matDialogRef: MatDialogRef<ModalSubjectComponent>) {}

  public handleClose() {
    this.matDialogRef.close(this.subject);
  }
}
