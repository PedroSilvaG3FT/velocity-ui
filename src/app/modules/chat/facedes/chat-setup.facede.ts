import { Injectable, inject } from '@angular/core';
import { Observable, Subscriber, lastValueFrom, mergeMap } from 'rxjs';
import { ChatSetupStore } from '../../../store/chat-setup.store';
import {
  IChatSetupModuleItem,
  IChatSetupOptionsItem,
} from '../interfaces/chat-setup.interface';
import { ChatSetupService } from '../services/chat-setup.service';

@Injectable({ providedIn: 'root' })
export class ChatSetupFacade {
  public _store = inject(ChatSetupStore);
  public _service = inject(ChatSetupService);

  public init() {
    return this.updateModules().pipe(
      mergeMap(() => this.updateFrameworks()),
      mergeMap(() => this.updateLanguages()),
      mergeMap(() => this.updateIDEs())
    );
  }

  private async buildSubmodules(
    modules: IChatSetupOptionsItem[],
    subscriber: Subscriber<unknown>
  ) {
    const result: IChatSetupModuleItem[] = [];

    for await (let module of modules) {
      try {
        const $request = this._service.getSubmodules(module.id);
        const submodules = await lastValueFrom($request);

        result.push({ ...module, submodules });
      } catch (error) {
        throw error;
      }
    }

    this._store.setModules(result);
    subscriber.next(true);
  }

  public updateModules() {
    return new Observable((subscriber) => {
      this._service.getModules().subscribe({
        next: (response) => this.buildSubmodules(response, subscriber),
        error: (error) => subscriber.error(error),
      });
    });
  }

  public updateIDEs() {
    return new Observable((subscriber) => {
      this._service.getIDEs().subscribe({
        next: (response) => {
          this._store.setIDEs(response);
          subscriber.next(true);
        },
        error: (error) => subscriber.error(error),
      });
    });
  }

  public updateLanguages() {
    return new Observable((subscriber) => {
      this._service.getLanguages().subscribe({
        next: (response) => {
          this._store.setLanguages(response);
          subscriber.next(true);
        },
        error: (error) => subscriber.error(error),
      });
    });
  }

  public updateFrameworks() {
    return new Observable((subscriber) => {
      this._service.getFrameworks().subscribe({
        next: (response) => {
          this._store.setFrameworks(response);
          subscriber.next(true);
        },
        error: (error) => subscriber.error(error),
      });
    });
  }
}
