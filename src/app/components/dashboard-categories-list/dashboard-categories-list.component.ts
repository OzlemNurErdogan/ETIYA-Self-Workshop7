import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-dashboard-categories-list',
  templateUrl: './dashboard-categories-list.component.html',
  styleUrls: ['./dashboard-categories-list.component.scss']
})
export class DashboardCategoriesListComponent implements OnInit {
  categories!: Category[];
  categoryForm!:FormGroup
  categoryToUpdate:Category | null = null

  constructor(
    private categoryService:CategoriesService ,
    private toastrService:ToastrService ,
    private router:Router ,
  ) {}

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categoryService.getList().subscribe({
      next:(response)=>{
        this.categories = response
      },
      error:()=>{
        this.toastrService.error('Category not found')
      },
      complete: () => {
        console.log('completed');
      },
    })
  }
}
