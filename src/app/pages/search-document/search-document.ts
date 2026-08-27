import { Component } from '@angular/core';
import { DocumentTable } from '../../shared/components/document-table/document-table';
import { Navbar } from '../../shared/components/navbar/navbar';
import { TabSearch } from '../../shared/components/tab-search/tab-search';

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
  imports: [DocumentTable, Navbar, TabSearch],
  templateUrl: './search-document.html',
  styleUrl: './search-document.scss',
})
export class SearchDocument {
  filters: DocumentFilters = {};

  onFiltersChange(filters: DocumentFilters): void {
    this.filters = filters;
  }

}
