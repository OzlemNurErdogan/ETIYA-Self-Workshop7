import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Product } from 'src/app/models/products';
import { CategoriesService } from 'src/app/services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  categoryForm!: FormGroup;
  categoryToUpdate: Category | null = null;

  get isEditting(): boolean {
    return this.categoryToUpdate !== null;
  }

  constructor(
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // this.productForm = new FormGroup({
    //   name: new FormControl(''),
    // });
  }

  ngOnInit(): void {
    this.createCategoryForm();
    this.getCategoryIdFromRoute();
  }

  createCategoryForm(): void {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]], 
      description: ['', [Validators.required, Validators.minLength(5)]], 
    });
  }

  getCategoryIdFromRoute(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['categoryId']) this.getCategoryById(params['categoryId']);
    });
  }

  getCategoryById(productId: number) {
    this.categoriesService.getById(productId).subscribe({
      next: (response) => {
        this.categoryToUpdate = response;
        this.categoryForm.patchValue(this.categoryToUpdate); //: Formun içine productToUpdate modelini doldurur.
      },
      error: () => {
        this.toastrService.error('Category not found');
        this.router.navigate(['/dashboard', 'category']);
      },
    });
  }

  onCategoryFormSubmit(): void {
    if (this.categoryForm.invalid) {
      this.toastrService.error('Please fill in the form correctly');
      return;
    }

    if (this.isEditting) this.update();
    else this.add();
  }

  onDeleteCategory(): void {
    if (confirm('Are you sure you want to delete this category?') === false)
      return;

    this.delete();
  }

  add(): void {
    const request: Category = {
      //: Backend'in product add endpoint'ine gönderilecek olan request modeli.
      ...this.categoryForm.value,
      name: this.categoryForm.value.name.trim(), //= ...this.productForm.value ile gelen 'name' değerinin üzerin tekrar yazıyoruz (overwrite).
    };

    this.categoriesService.add(request).subscribe((response) => {
      this.toastrService.success('Category added successfully');
      this.router.navigate(['/dashboard', 'category', 'edit', response.id]);
    });
  }

  update(): void {
    const request: Category = {
      id: this.categoryToUpdate!.id,
      description: this.categoryForm.value.description,
      name: this.categoryForm.value.name.trim(),
    };

    this.categoriesService.update(request).subscribe((response) => {
      this.categoryToUpdate = response;
      this.toastrService.success('Category updated successfully');
      this.router.navigate(['/dashboard', 'category']);
    });
  }

  delete(): void {
    this.categoriesService.delete(this.categoryToUpdate!.id).subscribe(() => {
      this.toastrService.success('Category deleted successfully');
      this.router.navigate(['/dashboard', 'category']);
    });
  }
}