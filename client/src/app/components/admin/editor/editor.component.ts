import { Component, OnInit, OnChanges, Input, Output } from "@angular/core";
import { Product } from "src/app/services/state/stateClasses";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AdminService } from "src/app/services/Admin/admin.service";
import { EventEmitter } from "@angular/core";

@Component({
  selector: "app-editor",
  templateUrl: "./editor.component.html",
  styleUrls: ["./editor.component.scss"]
})
export class EditorComponent implements OnInit {
  public editProductForm: FormGroup;
  public createProductForm: FormGroup;

  @Input() chosenProduct: Product;
  @Output() updateProducts = new EventEmitter<number>();
  private updatecount = 0;
  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit() {
    this.setEditform();
    this.setCreateForm();
  }

  ngOnChanges() {
    this.setEditform();
  }

  editProductRequest() {
    this.adminService.editProduct(this.editProductForm.value, this.chosenProduct._id).subscribe(
      res => {
        console.log(res);
        this.updateProducts.emit(this.updatecount++);
      },
      err => console.log(err)
    );
  }

  createProductRequest() {
    this.adminService
      .createProduct(this.createProductForm.value)
      .subscribe(res => {
        this.updateProducts.emit(this.updatecount++);
        this.setCreateForm();
      });
  }

  setEditform() {
    this.editProductForm = this.fb.group({
      name: [this.chosenProduct.name, [Validators.required]],
      category: [this.chosenProduct.category, [Validators.required]],
      image_url: [this.chosenProduct.image_url, [Validators.required]],
      price: [
        this.chosenProduct.price,
        [Validators.required, Validators.min(0)]
      ]
    });
  }

  setCreateForm() {
    this.createProductForm = this.fb.group({
      name: ["", [Validators.required]],
      category: ["", [Validators.required]],
      image_url: ["", [Validators.required]],
      price: ["", [Validators.required, Validators.min(0)]]
    });
  }
}
