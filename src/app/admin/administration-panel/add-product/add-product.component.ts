import {Component, OnInit} from '@angular/core';
import {Product} from '../../../models/product.model';
import {Category} from '../../../models/category-group.model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../../../services/product.service';
import {MenuService} from '../../../services/menu.service';
import {MatSnackBar} from '@angular/material';
import {TitleService} from '../../../services/title.service';

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
    this.configForms();
    this.getCategories();
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
      id: [{value: '', disabled: true}],
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
          id: [''],
          name: ['', Validators.required],
          value: ['', Validators.required]
        })
      ])
    });

  }

  initSpecificationPosition(): FormGroup {
    return this.formBuilder.group({
      id: [''],
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
    formGroup.markAllAsTouched();
    this.product = formGroup.value;
    this.saveProduct();
  }

  saveProduct(): void {
    this.saving = true;
    this.productService.createProduct(this.product).subscribe(data => {
        this.saving = false;
        this.product = data;
        this.productFormGroup.patchValue(data);
        this.showMessage();
        if (this.product.id) {
          this.redirectToCreatedProduct();
        }
      },
      error => {
        this.saving = false;
      }
    );
  }

  private showMessage() {
    this.snackBar
      .open('Dodano nowy produkt', null, {duration: 2000});
  }

  private redirectToCreatedProduct() {
    this.router.navigate(['../', this.product.id], {relativeTo: this.route});
  }
}
