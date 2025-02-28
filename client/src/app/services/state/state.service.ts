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
  private readonly _total = new BehaviorSubject<number>(0);

  readonly user$ = this._user.asObservable();
  readonly isloggedin$ = this._isloggedIn.asObservable();
  readonly isadmin$ = this._isadmin.asObservable();
  readonly cartitems$ = this._cartitems.asObservable();
  readonly total$ = this._total.asObservable();

  emptyUser: User = {
    ID: "",
    name: "",
    surname: "",
    email: "",
    cart: { creationDate: new Date(), items: [], total: 0 },
    orderHistory: [],
    admin: false,
    city: "",
    street: ""
  };

  get user(): User {
    return this._user.getValue()[0];
  }

  get isadmin(): boolean {
    return this._user.getValue()[0].admin||false;
  }
  get isloggedin(): boolean {
    return this.user ? !!this.user.ID : false;
  }
  set user(val: User) {
    this._user.next([val]);
    if (val.cart) {
      this._cartitems.next(val.cart.items || []);
      this._total.next(val.cart.total || 0);
    } else {
      this._cartitems.next([]);
      this._total.next(0);
    }
  }
  logIn(user: User) {
    this.user = user;
  }
  logOut() {
    this.user = this.emptyUser;
  }
}
