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

  public handleLoginTestMode() {
    this.authStore.setToken(
      `eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6ImtXYmthYTZxczh3c1RuQndpaU5ZT2hIYm5BdyJ9.eyJhdWQiOiI4NzljYzllYi0xZGIyLTRjMmMtODAyNC1jYzI3OTRkMjU3ZTkiLCJpc3MiOiJodHRwczovL2xvZ2luLm1pY3Jvc29mdG9ubGluZS5jb20vZDFmMzEyNDQtZWQ1NC00YzMzLWFjODMtNWM2Y2YyN2M2ZTBlL3YyLjAiLCJpYXQiOjE3MDg2MjkxNzgsIm5iZiI6MTcwODYyOTE3OCwiZXhwIjoxNzA4NjMzMDc4LCJuYW1lIjoiUGVkcm8gSGVucmlxdWUgU291emEgRGUgT2xpdmVpcmEgU2lsdmEiLCJub25jZSI6IjAxOGRkMjQyLWY0ODAtN2RkZC04NGE3LTUxODI2ZjEyMWMzZiIsIm9pZCI6IjA1YjViN2Q0LWY3MTMtNGQ1Ni1hZTRiLTg1MWE1ZDU3MGY4NiIsInByZWZlcnJlZF91c2VybmFtZSI6InBlZHJvLnNpbHZhQGNieWsuY29tLmJyIiwicmgiOiIwLkFTWUFSQkx6MFZUdE0weXNnMXhzOG54dUR1dkpuSWV5SFN4TWdDVE1KNVRTVi1rbUFNcy4iLCJzdWIiOiJ4RHp0WWQzaGszNlZwQ2ZvLTlQdjk2YVY0eVNHT3Voc3dIdkpMeUNad2hFIiwidGlkIjoiZDFmMzEyNDQtZWQ1NC00YzMzLWFjODMtNWM2Y2YyN2M2ZTBlIiwidXRpIjoiWS1SWGJsWVliVUtLYVY4YWxLYU5BQSIsInZlciI6IjIuMCJ9.TW9LOqvHBMHluyuzE6ASn65GQJCVo9-N60NB3a_9W96LI1I9LgQVRCTCbj9u4msQu9_U9YCsqnBAcmRfQvmgV0x5og5cIIQXlPBlP3OtsXjzRxRqpJldpTqpB5thDL1IsHFZ1YLQjKRuMSES1-y9_vPRoCjLRsFuibJtFiF4TCZ2jBciAXI4p7d_FQh0Ii0RXM0gE0R7UZzcK11dk5l2rdnxGdINNpTEcshM1FGmUGg6ADsOHuF-fQSPGegeobaHbcdF4VGnr1bSXnbHUa49dVZU4vSGmTC5Y2yYeNJHIHuB4RdJA5Ys3OyUHsoBhW9YTLuNQK2B77qZR9pp8ee0qw`
    );
    this.authStore.setTokenType(`Bearer`);
    this.authStore.setUserData({
      id: 17,
      isAllow: 1,
      email: 'pedro.silva@cbyk.com.br',
      message: 'Autenticação bem-sucedida',
      name: 'Pedro Henrique Souza De Oliveira Silva',
    });

    this.router.navigate(['/chat']);
  }

  private checkMicrosoftUser(data: AuthenticationResult) {
    this.authenticationService.getUserByEmail(data.account.username).subscribe({
      next: (response) => {
        this.authStore.setToken(data.idToken);
        this.authStore.setTokenType(data.tokenType);

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
