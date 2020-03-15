import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { StateService } from "../state/state.service";

@Injectable({
  providedIn: "root"
})
export class UserRouteGuardGuard implements CanActivate {
  constructor(private router: Router, private appState:StateService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.appState.isloggedin && !this.appState.isadmin) return true;
    this.router.navigate(["/home"]);
  }
}
