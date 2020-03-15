import { Injectable } from "@angular/core";
import { User, CartItem } from "./stateClasses";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root"
})
export class StateService {
  private readonly _user = new BehaviorSubject<User[]>([]);
  private readonly _isloggedIn = new BehaviorSubject<boolean>(false);
  private readonly _isadmin = new BehaviorSubject<boolean>(false);
  private readonly _cartitems = new BehaviorSubject<CartItem[]>([]);

  readonly user$ = this._user.asObservable();
  readonly isloggedin$ = this._isloggedIn.asObservable();
  readonly isadmin$ = this._isadmin.asObservable();
  readonly cartitems$ = this._cartitems.asObservable();

  get user(): User {
    return this._user.getValue()[0];
  }
  
  get isadmin(): boolean {
    return this._user.getValue()[0].admin;
  }
  get isloggedin(): boolean {
    return !!this.user;
  }
  set user(val: User) {
    this._user.next([val]);
    this._cartitems.next(val.cart.items);
  }
  logIn(user: User) {
    this.user = user;
  }
  state;
}
