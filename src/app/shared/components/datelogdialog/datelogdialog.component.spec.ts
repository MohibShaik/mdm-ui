import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatelogdialogComponent } from './datelogdialog.component';

describe('DatelogdialogComponent', () => {
  let component: DatelogdialogComponent;
  let fixture: ComponentFixture<DatelogdialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DatelogdialogComponent]
    });
    fixture = TestBed.createComponent(DatelogdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
