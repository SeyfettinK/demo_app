import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoseCalculatorComponent } from './dose-calculator.component';

describe('DoseCalculatorComponent', () => {
  let component: DoseCalculatorComponent;
  let fixture: ComponentFixture<DoseCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoseCalculatorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoseCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
