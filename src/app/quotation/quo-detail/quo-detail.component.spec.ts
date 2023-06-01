import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoDetailComponent } from './quo-detail.component';

describe('QuoDetailComponent', () => {
  let component: QuoDetailComponent;
  let fixture: ComponentFixture<QuoDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuoDetailComponent]
    });
    fixture = TestBed.createComponent(QuoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
