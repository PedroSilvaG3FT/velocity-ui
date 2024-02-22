import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { StoreService } from '../../@shared/services/store.service';
import { IAuthUserByEmailResponse } from '../interfaces/authentication.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public router = inject(Router);
  public storeService = inject(StoreService);

  constructor(private httpClient: HttpClient) {}

  public getUserByEmail(email: string) {
    return this.httpClient.post<IAuthUserByEmailResponse>(
      `${environment.api_url}/login/list-login`,
      { email }
    );
  }

  public microsoftCreateUser(email: string, name: string) {
    return this.httpClient.post(`${environment.api_url}user/send-user`, {
      name,
      email,
    });
  }

  public logout() {
    this.storeService.reset();
    this.router.navigate(['/auth/sign-in']);
  }
}
