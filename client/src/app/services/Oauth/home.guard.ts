import { Injectable } from "@angular/core";
import {
  CanActivate,
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
export class HomeGuard implements CanActivate {
  constructor(private router: Router, private appState: StateService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      console.log(this.appState.isloggedin, this.appState.isadmin);
      
    if (!this.appState.isloggedin) return true;
    if (this.appState.isloggedin && !this.appState.isadmin)
      this.router.navigate(["/products/all"]);
    if (this.appState.isloggedin && this.appState.isadmin)
      this.router.navigate(["/admin"]);
  }
}
