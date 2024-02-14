import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AppInputComponent } from '../../../@shared/components/form/app-input/app-input.component';

@Component({
  standalone: true,
  selector: 'auth-sign-up',
  styleUrl: './sign-up.component.scss',
  templateUrl: './sign-up.component.html',
  imports: [AppInputComponent, MatButtonModule, RouterLink],
})
export class SignUpComponent {}
