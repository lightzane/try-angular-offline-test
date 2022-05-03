import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {

  private internalConnectionChanged = new BehaviorSubject<boolean>(navigator.onLine);

  constructor() {
    addEventListener('online', () => this.updateOnlineStatus());
    addEventListener('offline', () => this.updateOnlineStatus());
  }

  get connectionChanged(): Observable<boolean> {
    return this.internalConnectionChanged.asObservable();
  }

  private updateOnlineStatus(): void {
    this.internalConnectionChanged.next(navigator.onLine);
  }
}
