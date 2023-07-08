import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstructionCostCalComponent } from './construction-cost-cal.component';

describe('ConstructionCostCalComponent', () => {
  let component: ConstructionCostCalComponent;
  let fixture: ComponentFixture<ConstructionCostCalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConstructionCostCalComponent]
    });
    fixture = TestBed.createComponent(ConstructionCostCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
