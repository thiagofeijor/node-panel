/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UprofileComponent } from './uprofile.component';

describe('UprofileComponent', () => {
  let component: UprofileComponent;
  let fixture: ComponentFixture<UprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
