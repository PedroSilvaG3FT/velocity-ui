import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { AuthStore } from '../../../../store/auth.store';
import { AppInputComponent } from '../../../@shared/components/form/app-input/app-input.component';
import { IAuthUserByEmailResponse } from '../../interfaces/authentication.interface';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  standalone: true,
  selector: 'auth-sign-in',
  styleUrl: './sign-in.component.scss',
  templateUrl: './sign-in.component.html',
  imports: [AppInputComponent, MatButtonModule, RouterLink],
})
export class SignInComponent {
  private router = inject(Router);
  private authStore = inject(AuthStore);
  private msalService = inject(MsalService);
  private authenticationService = inject(AuthenticationService);

  public handleMicrosoftPopup() {
    this.msalService.loginPopup().subscribe({
      next: (response) => {
        this.checkMicrosoftUser(response);
        this.authStore.setMicrosoftUser(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  private checkMicrosoftUser(data: AuthenticationResult) {
    this.authenticationService.getUserByEmail(data.account.username).subscribe({
      next: (response) => {
        if (response.email) this.handleMicrosoftSignin(response);
        else this.handleMicrosoftSignup(data);
      },
      error: (error) => {
        console.log('checkMicrosoftUser: ', error);
      },
    });
  }

  private handleMicrosoftSignin(data: IAuthUserByEmailResponse) {
    this.authStore.setUserData(data);
    this.router.navigate(['/chat']);
  }

  private handleMicrosoftSignup(data: AuthenticationResult) {
    console.log('CREATE USER :', data);

    this.authenticationService
      .microsoftCreateUser(data.account.username, String(data.account.name))
      .subscribe({
        next: (response) => {},
        error: (error) => {
          console.log('handleMicrosoftSignup: ', error);
        },
      });
  }
}
