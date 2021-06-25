import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnCompComponent } from './return-comp.component';

describe('ReturnCompComponent', () => {
  let component: ReturnCompComponent;
  let fixture: ComponentFixture<ReturnCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReturnCompComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
