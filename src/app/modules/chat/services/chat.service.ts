import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ChatFacede } from '../facedes/chat.facede';
import {
  ICreateSubject,
  ICreateSubjectResponse,
  ISendMessage,
  ISendMessageResponse,
  ISubjectItem,
  ISubjectResponse,
} from '../interfaces/chat.interface';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private chatFacede = inject(ChatFacede);

  constructor(private httpClient: HttpClient) {}

  public createSubject(data: ICreateSubject) {
    return this.httpClient.post<ICreateSubjectResponse>(
      `${environment.api_url}/subject/send-subject`,
      data
    );
  }

  public getSubjects(
    idSubModule: number,
    idUser: number
  ): Observable<ISubjectItem[]> {
    return this.httpClient
      .post<ISubjectResponse[]>(
        `${environment.api_url}/subjects/list-subjects`,
        { idSubModule, idUser }
      )
      .pipe(
        map((response) =>
          response.map((item) => ({
            id: item.ID,
            name: item.Name,
          }))
        )
      );
  }

  public getMessages(idSubject: number) {
    return this.httpClient.post<any[]>(
      `${environment.api_url}/messages/list-messages`,
      { idSubject }
    );
  }

  public sendMessage(data: ISendMessage) {
    const { submoduleName } = this.chatFacede.buildRequestURLParams(data);

    return this.httpClient.post<ISendMessageResponse>(
      `${environment.api_url}/${submoduleName}/send-${submoduleName}`,
      data
    );
  }
}
