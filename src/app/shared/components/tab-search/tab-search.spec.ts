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

  it('should request validated documents for the Validation tab', () => {
    const emitSpy = vi.spyOn(component.filtersChange, 'emit');

    component.onTabChange(1);

    expect(emitSpy).toHaveBeenCalledWith({ valide: true });
  });

  it('should remove the status filter for the Visualisation tab', () => {
    const emitSpy = vi.spyOn(component.filtersChange, 'emit');

    component.onTabChange(0);

    expect(emitSpy).toHaveBeenCalledWith({ valide: undefined });
  });
});
