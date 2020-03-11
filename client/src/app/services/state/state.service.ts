import { Injectable } from '@angular/core';
import { User, } from "./stateClasses";
@Injectable({
  providedIn: 'root'
})
export class StateService {
  static user:User
  
  constructor() { }
}
