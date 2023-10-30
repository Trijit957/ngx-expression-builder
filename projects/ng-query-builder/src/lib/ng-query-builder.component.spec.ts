import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgQueryBuilderComponent } from './ng-query-builder.component';

describe('NgQueryBuilderComponent', () => {
  let component: NgQueryBuilderComponent;
  let fixture: ComponentFixture<NgQueryBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgQueryBuilderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgQueryBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
