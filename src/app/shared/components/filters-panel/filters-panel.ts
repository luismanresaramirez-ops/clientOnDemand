import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-filters-panel',
  standalone:true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './filters-panel.html',
  styleUrl: './filters-panel.scss',
})
export class FiltersPanel {
  @Input() valide = false;
  @Output() filtersChange = new EventEmitter<any>();

  private fb = new FormBuilder();

  form = this.fb.group({
    documentCode: [''],
    folderList: [''],
    creationDateFrom: [''],
    creationDateTo: [''],
    contractNumber: [''],
    partnerName: [''],
    subsidiary: [''],
    companyCode: ['']
  });

  folders = ['Après vente Financement Unitaire', 'Beta93 Etats', 'CCL liste', 'CCL et fourniseurs France', 'Courriers Industriels', 'FUSE', 'LISE'];
  subsidiaries = ['Renault France', 'Renault Espagne', 'Renault Italie'];
  companyCodes = ['FR01', 'ES01', 'IT01'];

  search(): void {
    this.emitFilters();
  }

  reset(): void {
    this.form.reset({
      documentCode: '',
      folderList: '',
      creationDateFrom: '',
      creationDateTo: '',
      contractNumber: '',
      partnerName: '',
      subsidiary: '',
      companyCode: ''
    });
    this.emitFilters();
  }

  private emitFilters(): void {
    this.filtersChange.emit({
      ...this.form.value,
      valide: this.valide,
    });
  }
}
