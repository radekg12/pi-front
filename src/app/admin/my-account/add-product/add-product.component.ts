import {Component, OnInit} from '@angular/core';
import {Product} from "../../../models/product.model";
import {Category} from "../../../models/category-group.model";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../../services/product.service";
import {MenuService} from "../../../services/menu.service";
import {MatSnackBar} from "@angular/material";

const columns: string[] = ['name', 'detail'];

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  product: Product;
  dataSource;
  displayedColumns: string[] = columns;
  categories: Category[];
  productFormGroup: FormGroup;
  category: FormControl;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private menuService: MenuService,
              public snackBar: MatSnackBar) {
  }

  get id() {
    return this.productFormGroup.get('id');
  }

  get name() {
    return this.productFormGroup.get('name');
  }

  get company() {
    return this.productFormGroup.get('company');
  }

  get description() {
    return this.productFormGroup.get('description');
  }

  get imageUrl() {
    return this.productFormGroup.get('imageUrl');
  }

  get quantityInStock() {
    return this.productFormGroup.get('quantityInStock');
  }

  get unitPrice() {
    return this.productFormGroup.get('unitPrice');
  }

  get specificationPositions(): FormArray {
    return this.productFormGroup.get('specificationPositions') as FormArray;
  }

  get subcategory() {
    return this.productFormGroup.get('subcategory');
  }

  ngOnInit() {
    this.configForms();
    this.getCategories();
  }

  getCategories(): void {
    this.menuService.getMenuCategories().subscribe(
      data => {
        console.log("getCategories");
        this.categories = data;
      }
    );
  }

  configForms() {
    this.category = new FormControl('', [Validators.required]);

    this.productFormGroup = this.formBuilder.group({
      id: [{value: '', disabled: true}, Validators.required],
      name: ['', Validators.required],
      company: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
      quantityInStock: ['', Validators.required],
      unitPrice: ['', Validators.required],
      subcategory: ['', Validators.required],
      // specificationPositions: this.formBuilder.array([this.initSpecificationPosition()])

      specificationPositions: this.formBuilder.array([
        this.formBuilder.group({
          id: ['', Validators.required],
          name: ['', Validators.required],
          value: ['', Validators.required]
        })
      ])
    });

  }

  initSpecificationPosition(): FormGroup {
    return this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  addSpecificationPosition() {
    const specificationPositionsArray = <FormArray>this.specificationPositions;
    const newSpecificationPosition = this.initSpecificationPosition();

    specificationPositionsArray.push(newSpecificationPosition);
  }

  removeSpecificationPosition(idx: number) {
    const specificationPositionsArray = <FormArray>this.specificationPositions;
    specificationPositionsArray.removeAt(idx);
  }

  onSubmit(formGroup: FormGroup) {
    console.log('SUBMIT');
    console.log({value: formGroup.value, valid: formGroup.valid});
    this.product = formGroup.value;
    this.updateProduct();
  }

  updateProduct(): void {
    // this.productService.saveProduct(this.product).subscribe(data => {
    //     this.product = data;
    //     console.log("updated product");
    //     console.log(this.product);
    //     this.product.patchValue(data);
    //     this.showMessage();
    //   }
    // )

    this.showMessage();
  }

  private showMessage() {
    this.snackBar
      .open("Dodano nowy produkt", null, {duration: 2000,});
  }
}
