import { Component, EventEmitter, Output } from '@angular/core';
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
import {MatCheckboxModule} from '@angular/material/checkbox';

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
    MatNativeDateModule,
    MatCheckboxModule
  ],
  templateUrl: './filters-panel.html',
  styleUrl: './filters-panel.scss',
})
export class FiltersPanel {
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
    companyCode: [''],
    valide:[false]
  });

  folders = ['Tous', 'Factures', 'Contrats', 'Avoirs'];
  subsidiaries = ['Renault France', 'Renault Espagne', 'Renault Italie'];
  companyCodes = ['FR01', 'ES01', 'IT01'];

  search(): void {
    console.log(this.form.value);
    this.filtersChange.emit(this.form.value);
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
      companyCode: '',
      valide: false,
    });
    this.filtersChange.emit(this.form.value);
  }
}
