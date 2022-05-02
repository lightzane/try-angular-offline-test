import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private readonly http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`https://jsonplaceholder.typicode.com/users`);
  }

  addUsers(): Observable<any> {
    return this.http.post(`https://jsonplaceholder.typicode.com/users`, {
      "id": uuidv4(),
      "name": "Jane Doe",
      "username": "Jane",
      "email": "jane@sweet.biz",
    });
  }

  removeUser(): Observable<any> {
    return this.http.delete(`https://jsonplaceholder.typicode.com/users/1`);
  }
}
