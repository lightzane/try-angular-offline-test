import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BSONService } from './bson.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly http: HttpClient,
    private readonly bsonService: BSONService) { }

  getUsers(): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  }

  addUsers(): Observable<any> {
    return this.http.patch(`https://jsonplaceholder.typicode.com/users/1`, {
      "id": this.bsonService.createObjectId(),
      "name": "Jane Doe",
      "username": "Jane",
      "email": "jane@sweet.biz",
    });
  }

  removeUser(): Observable<any> {
    return this.http.delete(`https://jsonplaceholder.typicode.com/users/1`);
  }
}
