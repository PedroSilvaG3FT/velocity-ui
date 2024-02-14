import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { IAuthUserByEmailResponse } from '../interfaces/authentication.interface';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
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
}
