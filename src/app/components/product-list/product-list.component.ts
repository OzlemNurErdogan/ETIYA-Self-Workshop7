import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  productCardClass: string = 'card col-3 ms-3 mb-3';


  products!: Product[];

  public isLoading:boolean=false;

  selectedProductCategoryId: number | null = null;
  searchProductNameInput: string | null = null;

  get filteredProducts(): Product[] {
    let filteredProducts = this.products;

    if (this.selectedProductCategoryId)
      filteredProducts = filteredProducts.filter(
        (p) => p.categoryId === this.selectedProductCategoryId
      );

      if (this.searchProductNameInput)
      filteredProducts = filteredProducts.filter((p) =>
        p.name
          .toLowerCase()
          .includes(this.searchProductNameInput!.toLowerCase())
      );

    return filteredProducts;
  }

  constructor(private activatedRoute: ActivatedRoute,
     private router:Router,
     private productsService: ProductsService) {}

  ngOnInit(): void {
    this.getCategoryIdFromRoute();
    this.getSearchProductNameFromRoute(); /////////////////////
    this.getListProducts();
  }

  getCategoryIdFromRoute(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId'])
        this.selectedProductCategoryId = parseInt(params['categoryId']);
      else this.selectedProductCategoryId = null;
     
    });
  }

  getListProducts() {
    this.productsService.getList().subscribe((response) => {
      setTimeout(() => {    //Datayı lokalden çektiğimiz için işlem hızlı olduğundan spinnerı göremediğimiz için timeout kullandım.
        this.products=response;
      
      this.isLoading=true;
      }, 1500);
    })
  }

  getSearchProductNameFromRoute(): void {
    //: query params'ları almak adına activatedRoute.queryParams kullanılır.
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      // && this.searchProductNameInput == null
      if (
        queryParams['searchProductName'] &&
        queryParams['searchProductName'] !== this.searchProductNameInput
      )
        this.searchProductNameInput = queryParams['searchProductName'];
      //# Defensive Programming
      if (
        !queryParams['searchProductName'] &&
        this.searchProductNameInput !== null
      )
        this.searchProductNameInput = null;
    });
  }

  isProductCardShow(product: any): boolean {
    return product.discontinued == false;
  }



  onSearchProductNameChange(event: any): void {
    //this.searchProductNameInput = event.target.value;  //ngModel bu işlemi yapıyo

    const queryParams: any = {};
    if (this.searchProductNameInput !== '')
      queryParams['searchProductName'] = this.searchProductNameInput;
    this.router.navigate([], {
      queryParams: queryParams,
    });
  }
}
