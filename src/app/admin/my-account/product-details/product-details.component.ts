import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ProductService} from "../../../services/product.service";
import {Product} from "../../../models/product.model";
import {MatSnackBar} from "@angular/material";
import {MenuService} from "../../../services/menu.service";
import {Category} from "../../../models/category-group.model";

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

  get specificationPosition() {
    return this.productFormGroup.get('specificationPosition');
  }

  get subcategory() {
    return this.productFormGroup.get('subcategory');
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
    });
    this.getCategories();
    this.getProduct();
    this.configForms();
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
      specificationPosition: ['', Validators.required]
    });

  }

  onSelectstart(event) {
    console.log("onSelectstart");
    console.log(event);
  }

  private getProduct() {
    this.productService.getProduct(this.productId).subscribe(data => {
      this.product = data;
      this.dataSource = this.product.specificationPositions;

      this.productFormGroup.patchValue(data);
      this.subcategory.patchValue(this.categories[0].subcategories.filter(s => s.id === this.product.subcategory.id));
    })
  }

  private showMessage() {
    this.snackBar
      .open("Zapisano zmiany", null, {duration: 2000,});
  }
}
