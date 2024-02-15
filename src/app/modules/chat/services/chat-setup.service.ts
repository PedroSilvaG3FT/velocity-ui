import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  IChatSetupOptionResponse,
  IChatSetupOptionsItem,
} from '../interfaces/chat-setup.interface';

@Injectable({ providedIn: 'root' })
export class ChatSetupService {
  constructor(private httpClient: HttpClient) {}

  private handlerResponseMap(
    data: IChatSetupOptionResponse[]
  ): IChatSetupOptionsItem[] {
    return data.map((item) => ({
      id: item.ID,
      name: item.Name,
      createdAt: item.CreatedAt,
    }));
  }

  private handlerRequest(path: string) {
    return this.httpClient
      .get<IChatSetupOptionResponse[]>(`${environment.api_url}${path}`)
      .pipe(map((response) => this.handlerResponseMap(response)));
  }

  public getModules() {
    return this.handlerRequest('/modules/list-modules');
  }

  public getSubmodules(idModule: number) {
    const url = `${environment.api_url}/submodules/list-submodules`;

    return this.httpClient
      .post<IChatSetupOptionResponse[]>(url, { idModule })
      .pipe(
        map((response) =>
          response.map((item) => ({ id: item.ID, name: item.Name }))
        )
      );
  }

  public getFrameworks() {
    return this.handlerRequest('/frameworks/list-frameworks');
  }

  public getIDEs() {
    return this.handlerRequest('/ides/list-ides');
  }

  public getLanguages() {
    return this.handlerRequest(
      '/programming-languages/list-programming-languages'
    );
  }
}
