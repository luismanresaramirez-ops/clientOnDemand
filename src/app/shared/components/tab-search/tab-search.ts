import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { FiltersPanel } from '../filters-panel/filters-panel';
import { DocumentFilters } from '../../../pages/search-document/search-document';

@Component({
  selector: 'app-tab-search',
  imports: [FiltersPanel, MatIconModule, MatTabsModule],
  templateUrl: './tab-search.html',
  styleUrl: './tab-search.scss',
})
export class TabSearch {
  @Output() filtersChange = new EventEmitter<DocumentFilters>();

  onFiltersChange(filters: DocumentFilters): void {
    this.filtersChange.emit(filters);
  }

  onTabChange(index: number): void {
    this.filtersChange.emit({ valide: index === 1 ? true : undefined });
  }
}
