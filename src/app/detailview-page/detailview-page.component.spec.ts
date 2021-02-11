import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DetailviewPageComponent } from "./detailview-page.component";

describe("DetailviewPageComponent", () => {
  let component: DetailviewPageComponent;
  let fixture: ComponentFixture<DetailviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailviewPageComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
