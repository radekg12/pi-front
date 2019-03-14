import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product.model";
import {MatSnackBar} from "@angular/material";
import {MenuService} from "../../../services/menu.service";
import {Category} from "../../../models/category-group.model";
import {SpecificationPosition} from "../../../models/specification-position.model";

const columns: string[] = ['name', 'detail'];

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productId: number;
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
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
    });
    this.configForms();
    this.getCategories();
    this.getProduct();
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
          value: ['', Validators.required],
        })
      ])
    });

  }

  onSelectstart(event) {
    console.log("onSelectstart");
    console.log(event);
  }

  initSpecificationPosition(): FormGroup {
    return this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  private showMessage() {
    this.snackBar
      .open("Zapisano zmiany", null, {duration: 2000,});
  }

  initExistSpecificationPosition(specificationPosition: SpecificationPosition): FormGroup {
    return this.formBuilder.group({
      id: [specificationPosition.id, Validators.required],
      name: [specificationPosition.name, Validators.required],
      value: [specificationPosition.value, Validators.required],
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

  clearArray() {
    const specificationPositionsArray = <FormArray>this.specificationPositions;
    let length: number = specificationPositionsArray.length;

    for (let i = 0; i <= (length - 1); i++) {
      specificationPositionsArray.removeAt(i);
    }
  }

  setSpecificationPositions(specificationPositions: SpecificationPosition[]) {

    // this.specificationPositions.setValue([]);
    this.clearArray();

    const specificationPositionsArray = <FormArray>this.specificationPositions;

    specificationPositions.forEach(p => {
      const newSpecificationPosition = this.initExistSpecificationPosition(p);

      specificationPositionsArray.push(newSpecificationPosition);
    });
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

  private getProduct() {
    this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
      this.dataSource = this.product.specificationPositions;

      this.productFormGroup.patchValue(data);

      this.menuService.getCategoryBySubcategoryId(this.product.subcategory.id).subscribe(data => {
        console.log("getCategoryBySubcategoryId");
        let categoryId = data.id;
        console.log(this.category);
        console.log("setCategory id=" + categoryId + " of categories");
        console.log(this.categories);
        this.category.setValue(this.categories.filter(c => c.id === categoryId).pop());

        this.subcategory.setValue(this.categories.filter(c => c.id === categoryId).pop().subcategories.filter(s => s.id === this.product.subcategory.id).pop());
      });

      this.setSpecificationPositions(data.specificationPositions)
    })
  }
}
