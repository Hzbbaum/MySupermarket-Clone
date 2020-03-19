import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn,
  AsyncValidator,
  FormControl,
  AsyncValidatorFn
} from "@angular/forms";
import { Observable, observable } from "rxjs";
import { ThrowStmt } from "@angular/compiler";
import { UserActionsService } from "src/app/services/user-actions/user-actions.service";
import {
  subscribeOn,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  first
} from "rxjs/operators";
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
        this.availableDateValidator.bind(this)
      ],
      last4: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
      ]
    });
  }
  availableDateValidator(control: AbstractControl): AsyncValidatorFn {
    return control =>
      control.valueChanges.pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap(value => this.userActions.checkDate(value)),
        map((available: boolean) =>
          available ? null : { dateAvailableViolated: true }
        ),
        first()
      );
  }
  autocomplete(elem: { target: { name: any; value: any } }) {
    let autocompleteField = elem.target.name;
    let quickComplete = this.appstate.user[autocompleteField];
    elem.target.value = quickComplete;
  }
}
