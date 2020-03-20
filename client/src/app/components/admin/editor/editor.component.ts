import { Component, OnInit, Input } from "@angular/core";
import { Product } from "src/app/services/state/stateClasses";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { log } from 'util';

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"]
})
export class EditorComponent implements OnInit {
  public editProductForm: FormGroup;
  public createProductForm: FormGroup;

  @Input() chosenProduct: Product;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    console.log("loaded");
    
    this.editProductForm = this.fb.group({
      name: [this.chosenProduct.name, [Validators.required]],
      category: [this.chosenProduct.category, [Validators.required]],
      image_url: [this.chosenProduct.image_url, [Validators.required]],
      price: [this.chosenProduct.price, [Validators.required, Validators.min(0)]]
    });
    this.createProductForm = this.fb.group({
      name: ["", [Validators.required]],
      category: ["", [Validators.required]],
      image_url: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.min(0)]]
    });
  }
  editProductRequest(values){
    console.log(values);
    
  }

  createProductRequest(values){
    console.log(values);
    
  }
}
