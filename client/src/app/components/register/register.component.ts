import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  AsyncValidatorFn,
  ValidationErrors
} from "@angular/forms";
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  map,
  first
} from "rxjs/operators";
import { OauthService } from "src/app/services/Oauth/oauth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  registerFormGroup: FormGroup;

  get formArray(): AbstractControl | null {
    return this.registerFormGroup.get("formArray");
  }

  public cities: string[] = [
    "tel-aviv",
    "jerusalem",
    "haifa",
    "beersheva",
    "lod",
    "petah-tikva",
    "kfar saba",
    "holon",
    "rishon-letzion",
    "city1"
  ];

  constructor(private _fb: FormBuilder, private _os: OauthService) {}

  ngOnInit() {
    this.registerFormGroup = this._fb.group({
      formArray: this._fb.array([
        this._fb.group(
          {
            IDCtrl: [
              "",
              [
                Validators.required,
                Validators.maxLength(9),
                Validators.minLength(9),
              ]
            ],
            emailCtrl: ["", [Validators.required, Validators.email]],
            passwordCtrl: [
              "",
              [
                Validators.required,
                Validators.minLength(4),
                Validators.minLength(30)
              ]
            ],
            password2Ctrl: [
              "",
              [
                Validators.required,
                Validators.minLength(4),
                Validators.minLength(30)
              ]
            ]
          }
          // { validators: [this.equalityValidator] }
        ),
        this._fb.group({
          nameCtrl: ["", [Validators.required]],
          surnameCtrl: ["", [Validators.required]],
          cityCtrl: ["", [Validators.required]],
          streetCtrl: ["", [Validators.required]]
        })
      ])
    });
  }

  equalityValidator(group: FormGroup) {
    let pass = group.get("passwordCtrl").value;
    let confirmPass = group.get("password2Ctrl").value;
    return pass === confirmPass ? null : { notSame: true };
  }

  registerUser() {
    console.log("registering");
  }
}
