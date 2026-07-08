import { Component } from '@angular/core';
import { FiltersPanel } from '../../shared/components/filters-panel/filters-panel';
import { DocumentTable } from '../../shared/components/document-table/document-table';

export interface DocumentFilters {
  documentCode?: string;
  folderList?: string;
  creationDateFrom?: string;
  creationDateTo?: string;
  contractNumber?: string;
  partnerName?: string;
  subsidiary?: string;
  companyCode?: string;
  valide?: boolean;
}

@Component({
  selector: 'app-search-document',
  imports: [ FiltersPanel, DocumentTable ],
  templateUrl: './search-document.html',
  styleUrl: './search-document.scss',
})
export class SearchDocument {
  filters: DocumentFilters = {};

  onFiltersChange(filters: DocumentFilters): void {
    this.filters = filters;
  }

}
