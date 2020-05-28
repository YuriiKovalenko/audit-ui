import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimeSelectorComponent } from './datetime-selector.component';

describe('DatetimeSelectorComponent', () => {
  let component: DatetimeSelectorComponent;
  let fixture: ComponentFixture<DatetimeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatetimeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatetimeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
