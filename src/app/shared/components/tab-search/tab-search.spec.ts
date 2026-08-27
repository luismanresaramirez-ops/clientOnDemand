import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSearch } from './tab-search';

describe('TabSearch', () => {
  let component: TabSearch;
  let fixture: ComponentFixture<TabSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(TabSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
