import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDocument } from './search-document';

describe('SearchDocument', () => {
  let component: SearchDocument;
  let fixture: ComponentFixture<SearchDocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDocument],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchDocument);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
