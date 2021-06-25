import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarParkTableComponent } from './car-park-table.component';

describe('CarParkTableComponent', () => {
  let component: CarParkTableComponent;
  let fixture: ComponentFixture<CarParkTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarParkTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarParkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
