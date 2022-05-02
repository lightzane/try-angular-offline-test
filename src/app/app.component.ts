import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './services/data.service';
import { IndexedDBService } from './services/indexed-db.service';
import { v4 as uuidv4 } from 'uuid';
import ObjectID from "bson-objectid";
import { BSONService } from './services/bson.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  _id: ObjectID | string;

  users$: BehaviorSubject<any[]> = new BehaviorSubject(null);
  errMsg: any;
  success: boolean = false;

  constructor(
    private readonly dataService: DataService,
    private readonly indexedDBService: IndexedDBService,
    private readonly bsonService: BSONService
  ) { }

  ngOnInit(): void {
    this.dataService.getUsers().subscribe(data => this.users$.next(data));
    this._id = `This is the _id: ${this.bsonService.createObjectId()}`;
  }

  addUser(): void {
    this.resetAlert();
    this.dataService.addUsers()
      .subscribe({
        next: (user) => { if (user) { this.users$.next(this.users$.getValue().concat(user)); this.showSuccess(); this.insertToDb(user); } },
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

}
