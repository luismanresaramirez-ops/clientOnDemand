import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentTable } from './document-table';

describe('DocumentTable', () => {
  let component: DocumentTable;
  let fixture: ComponentFixture<DocumentTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentTable],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display only validated documents when valide is true', () => {
    component.filters = { valide: true };

    component.ngOnChanges();

    expect(component.dataSource.data.length).toBe(7);
    expect(component.dataSource.data.every(document => document.status === true)).toBe(true);
  });

  it('should display all documents when no status filter is set', () => {
    component.filters = { valide: undefined };

    component.ngOnChanges();

    expect(component.dataSource.data).toEqual(component.documents);
  });
});
