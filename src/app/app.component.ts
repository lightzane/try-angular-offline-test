import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of, switchMap, tap } from 'rxjs';
import { DataService, mockData } from './services/data.service';
import { IndexedDBService } from './services/indexed-db.service';
import ObjectID from "bson-objectid";
import { BSONService } from './services/bson.service';
import { OfflineService } from './services/offline.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  _id: ObjectID;

  users$: BehaviorSubject<any[]> = new BehaviorSubject(null);
  errMsg: any;
  success: boolean = false;
  isOnline: boolean;

  constructor(
    private readonly dataService: DataService,
    private readonly indexedDBService: IndexedDBService,
    private readonly bsonService: BSONService,
    private readonly offlineService: OfflineService
  ) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(data => this.users$.next(data));
    this._id = this.bsonService.createObjectId();
    this.listenOnlineStatus();
  }

  addUser(user?: any): void {
    this.resetAlert();
    this.dataService.addUsers(user)
      .subscribe({
        next: (user) => { if (user) { this.users$.next(this.users$.getValue().concat(user)); this.showSuccess(); this.indexedDBService.removeData(); } },
        error: (err) => this.showError(err),
        complete: () => console.log(`Observable "addUser" completed`)
      });
  }

  removeUser(): void {
    this.resetAlert();
    this.dataService.removeUser()
      .subscribe({
        next: (data) => { if (data) { this.fakeRemoveUser(data); } },
        error: (err) => this.showError(err),
        complete: () => console.log(`Observable "removeUser" completed`)
      });
  }

  private fakeRemoveUser(data: any): void {
    if (data) { this.showSuccess(); }

    const users = this.users$.getValue();

    if (users.length <= 10) { return; }

    users.pop();
    this.users$.next(users);

  }

  private showError(err: any): void {
    console.error(err);
    this.errMsg = err.message || err;
    this.success = false;
    this.insertToDb(mockData);
  }

  private resetAlert(): void {
    this.errMsg = null;
    this.success = false;
  }

  private showSuccess(): void {
    this.success = true;
  }

  private insertToDb(user: any): void {
    if (user) {
      this.indexedDBService.addUser(user);
    }
  }

  private listenOnlineStatus(): void {
    this.offlineService.connectionChanged
      .pipe(
        tap(online => this.isOnline = online),
        tap(online => this.checkIndexedDB(online))
      ).subscribe();
  }

  private async checkIndexedDB(online: boolean): Promise<void> {
    if (online) {
      const data = await this.indexedDBService.getData();
      if (data) {
        for (let item of data) {
          this.addUser(item);
        }
      }
    }

  }

}
