import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCategoriesPageComponent } from './dashboard-categories-page.component';

describe('DashboardCategoriesPageComponent', () => {
  let component: DashboardCategoriesPageComponent;
  let fixture: ComponentFixture<DashboardCategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCategoriesPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
