import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosSideBarComponent } from './photos-side-bar.component';

describe('PhotosSideBarComponent', () => {
  let component: PhotosSideBarComponent;
  let fixture: ComponentFixture<PhotosSideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotosSideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
