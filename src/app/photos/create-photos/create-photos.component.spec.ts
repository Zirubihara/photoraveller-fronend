import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePhotosComponent } from './create-photos.component';

describe('CreatePhotosComponent', () => {
  let component: CreatePhotosComponent;
  let fixture: ComponentFixture<CreatePhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
