import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  AsyncValidator
} from "@angular/forms";
import { Observable, observable } from "rxjs";
import { ThrowStmt } from "@angular/compiler";
import { UserActionsService } from "src/app/services/user-actions/user-actions.service";
import { subscribeOn } from "rxjs/operators";
import { StateService } from "src/app/services/state/state.service";

@Component({
  selector: "app-payment-form",
  templateUrl: "./payment-form.component.html",
  styleUrls: ["./payment-form.component.scss"]
})
export class PaymentFormComponent implements OnInit {
  public orderForm: FormGroup;
  constructor(
    public fb: FormBuilder,
    private appstate: StateService,
    public userActions: UserActionsService
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      city: ["", [Validators.required]],
      street: ["", [Validators.required]],
      requiredDeliveryDate: [
        "",
        [Validators.required],
        this.availableDate.bind(this)
      ],
      last4: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
      ]
    });
  }
  availableDate(control: AbstractControl) {
    return this.userActions.checkDate(control.value);
  }
  autocomplete(elem: { target: { name: any; value: any } }) {
    let autocompleteField = elem.target.name;
    let quickComplete = this.appstate.user[autocompleteField];
    elem.target.value = quickComplete;

  }
}
