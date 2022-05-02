import { Injectable } from '@angular/core';
import ObjectID from 'bson-objectid';

@Injectable({
  providedIn: 'root'
})
export class BSONService {

  constructor() { }

  createObjectId(): ObjectID {
    return ObjectID();
  }
}
