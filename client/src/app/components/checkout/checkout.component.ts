import { Component, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(public appState:StateService, public route:Router) { }

  ngOnInit() {
  }
  logout() {
    this.appState.logOut();
    this.route.navigate(["/home"]);
  }

}
