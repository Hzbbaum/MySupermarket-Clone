import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";

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
  public cities: string[] = ["tel-aviv", "jerusalem"];

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.registerFormGroup = this._fb.group({
      formArray: this._fb.array([
        this._fb.group({
          IDCtrl: [
            "",
            [
              Validators.required,
              Validators.maxLength(9),
              Validators.minLength(9)
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
        }),
        this._fb.group({
          nameCtrl: ["", [Validators.required]],
          surnameCtrl: ["", [Validators.required]],
          cityCtrl: ["", [Validators.required]],
          streetCtrl: ["", [Validators.required]]
        })
      ])
    });
  }
}
