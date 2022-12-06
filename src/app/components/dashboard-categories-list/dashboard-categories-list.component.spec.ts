import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCategoriesListComponent } from './dashboard-categories-list.component';

describe('DashboardCategoriesListComponent', () => {
  let component: DashboardCategoriesListComponent;
  let fixture: ComponentFixture<DashboardCategoriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardCategoriesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
