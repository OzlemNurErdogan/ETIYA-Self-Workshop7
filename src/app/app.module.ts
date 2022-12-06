import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgModule } from '@angular/core';

import { ProductFormComponent } from './components/product-form/product-form.component';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ToastrModule } from 'ngx-toastr';
import { DashboardProductsPageComponent } from './pages/dashboard-products-page/dashboard-products-page.component';
import { ProductFormPageComponent } from './pages/product-form-page/product-form-page.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { DashboardCategoriesPageComponent } from './pages/dashboard-categories-page/dashboard-categories-page.component';
import { DashboardCategoriesListComponent } from './components/dashboard-categories-list/dashboard-categories-list.component';
import { DashboardProductListComponent } from './components/dashboard-product-list/dashboard-product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CategoryListComponent,
    ProductListComponent,
    HomePageComponent,
    LoginPageComponent,
    LoadingSpinnerComponent,
    ProductFormComponent,
    ProductFormPageComponent,
    DashboardProductsPageComponent,
    ProductFormPageComponent,
    CategoryFormComponent,
    DashboardCategoriesPageComponent,
    DashboardCategoriesListComponent,
    DashboardProductListComponent,
  ], // HTML tarafındaki angular bileşenlerini tanımlar
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ], // Angular modülleri import edeceğimiz yer
  providers: [], // IoC Container'daki Dependency Injection'ları tanımlar
  bootstrap: [AppComponent], // Hangi bileşenin ilk açıldığında çalışacağını belirtir
})
export class AppModule {}
