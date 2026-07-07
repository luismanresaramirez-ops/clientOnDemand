import { Component } from '@angular/core';
import { FiltersPanel } from '../../shared/components/filters-panel/filters-panel';
import { DocumentTable } from '../../shared/components/document-table/document-table';

@Component({
  selector: 'app-search-document',
  imports: [ FiltersPanel, DocumentTable ],
  templateUrl: './search-document.html',
  styleUrl: './search-document.scss',
})
export class SearchDocument {}
