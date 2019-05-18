import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductService} from '../../../services/product.service';
import {Product} from '../../../models/product.model';
import {MatSnackBar} from '@angular/material';
import {MenuService} from '../../../services/menu.service';
import {Category} from '../../../models/category-group.model';
import {SpecificationPosition} from '../../../models/specification-position.model';
import {TitleService} from '../../../services/title.service';

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
  saving = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private formBuilder: FormBuilder,
              private productService: ProductService,
              private menuService: MenuService,
              public snackBar: MatSnackBar,
              private titleService: TitleService) {
  }

  get logicalQuantityInStock() {
    return this.productFormGroup.get('logicalQuantityInStock');
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

  get physicalQuantityInStock() {
    return this.productFormGroup.get('physicalQuantityInStock');
  }

  ngOnInit() {
    this.titleService.init();
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
    });
    this.configForms();
    this.getCategories();
    this.getProduct();
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

  getCategories(): void {
    this.menuService.getMenuCategories().subscribe(
      data => {
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
      logicalQuantityInStock: ['', Validators.required],
      physicalQuantityInStock: ['', Validators.required],
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
    console.log('onSelectstart');
    console.log(event);
  }

  initSpecificationPosition(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  clearArray() {
    const specificationPositionsArray = <FormArray>this.specificationPositions;
    const length: number = specificationPositionsArray.length;

    for (let i = 0; i <= (length - 1); i++) {
      specificationPositionsArray.removeAt(i);
    }
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

  private showMessage() {
    this.snackBar
      .open('Zapisano zmiany', null, {duration: 2000});
  }

  setSpecificationPositions(specificationPositions: SpecificationPosition[]) {
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
    console.log('formGroup.getRawValue()');
    console.log(formGroup.getRawValue());
    console.log('formGroup.value');
    console.log(formGroup.value);
    this.product = formGroup.getRawValue();
    this.updateProduct();
  }

  updateProduct(): void {
    this.saving = true;
    this.productService.updateProduct(this.product).subscribe(data => {
        this.saving = false;
        this.product = data;
        console.log('updated product');
        console.log(this.product);
        this.productFormGroup.patchValue(data);
        this.showMessage();
      },
      error1 => {
        this.saving = false;
      }
    );

  }

  private getProduct() {
    this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
      this.dataSource = this.product.specificationPositions;

      this.productFormGroup.patchValue(data);

      this.menuService.getCategoryBySubcategoryId(this.product.subcategory.id).subscribe(categoryData => {
        console.log('getCategoryBySubcategoryId');
        const categoryId = categoryData.id;
        console.log(this.category);
        console.log(`setCategory id=${categoryId} of categories`);
        console.log(this.categories);
        this.category.setValue(this.categories.filter(c => c.id === categoryId).pop());

        this.subcategory.setValue(this.categories.filter(c => c.id === categoryId).pop().subcategories.filter(s => s.id === this.product.subcategory.id).pop());
      });

      this.setSpecificationPositions(data.specificationPositions);
    });
  }
}
