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
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";
import { DeliveryDialogComponent } from "./delivery-dialog/delivery-dialog.component";

export interface DialogData {
  success: boolean;
  message: string;
}

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
    public userActions: UserActionsService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      city: ["", [Validators.required]],
      street: ["", [Validators.required]],
      requiredDeliveryDate: [
        "",
        [
          Validators.required
          // this.availableDateValidator.bind(this)
        ]
      ],
      last4: [
        "",
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)]
      ]
    });
  }
  // availableDateValidator(control: AbstractControl): AsyncValidatorFn {
  //   return control =>
  //     control.valueChanges.pipe(
  //       debounceTime(250),
  //       distinctUntilChanged(),
  //       switchMap(value => this.userActions.checkDate(value)),
  //       map((available: boolean) =>
  //         available ? null : { dateAvailableViolated: true }
  //       ),
  //       first()
  //     );
  // }
  autocomplete(elem: { target: { name: any; value: any } }) {
    let autocompleteField = elem.target.name;
    let quickComplete = this.appstate.user[autocompleteField];
    elem.target.value = quickComplete;
  }

  placeOrderRequest(values: AbstractControl["value"][]) {
    this.userActions.orderCart(values).subscribe(res => {
      if (res["success"]) {
        this.openDialog(true, "yeah");
      } else console.log(res);
      err => {
        this.openDialog(false, err);
        console.log(err);
      };
    });
  }
  openDialog(success: boolean, message: string): void {
    console.log("opening");

    const dialogRef = this.dialog.open(DeliveryDialogComponent, {
      width: "250px",
      data: { success: success, message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }
}
