import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BSONService } from './bson.service';
import ObjectID from "bson-objectid";

// https://www.youtube.com/watch?v=lrzRGyBeWpQ

export const mockData = {
  "id": null,
  "name": "Jane Doe",
  "username": "Jane",
  "email": "jane@sweet.biz",
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly http: HttpClient,
    private readonly bsonService: BSONService) { }

  getUsers(): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  }

  addUsers(user: any): Observable<any> {
    const data = user || mockData;
    if (!user) data.id = ObjectID().toHexString();
    console.log(data);
    return this.http.patch(`https://jsonplaceholder.typicode.com/users/1`, data);
  }

  removeUser(): Observable<any> {
    return this.http.delete(`https://jsonplaceholder.typicode.com/users/1`);
  }
}
