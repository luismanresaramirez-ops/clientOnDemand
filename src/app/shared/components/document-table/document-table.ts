import { Component, ViewChild } from '@angular/core';

import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

export interface DocumentItem {
  code: string;
  fileName: string;
  folder: string;
  contractNumber: string;
  partnerName: string;
  subsidiary: string;
  companyCode: string;
  creationDate: string;
  status: string;
  pdfUrl: string;
}

@Component({
  selector: 'app-document-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule
  ],
  templateUrl: './document-table.html',
  styleUrl: './document-table.scss'
})
export class DocumentTable {
  displayedColumns: string[] = [
    'code',
    'fileName',
    'folder',
    'contractNumber',
    'partnerName',
    'subsidiary',
    'companyCode',
    'creationDate',
    'status',
    'actions'
  ];

  dataSource = new MatTableDataSource<DocumentItem>([
    {
      code: 'FAC-2026-001245',
      fileName: 'facture_001245.pdf',
      folder: 'Factures',
      contractNumber: '654123987',
      partnerName: 'Renault Retail Group',
      subsidiary: 'Renault France',
      companyCode: 'FR01',
      creationDate: '07/07/2026',
      status: 'En cours',
      pdfUrl: 'exemple.pdf'
    },
    {
      code: 'FAC-2026-001246',
      fileName: 'facture_001246.pdf',
      folder: 'Factures',
      contractNumber: '654123988',
      partnerName: 'Mobilize Financial Services',
      subsidiary: 'Renault France',
      companyCode: 'FR01',
      creationDate: '06/07/2026',
      status: 'Validé',
      pdfUrl: 'exemple.pdf'
    }
  ]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  openDocument(document: DocumentItem): void {
    window.open(document.pdfUrl, '_blank');
  }

  downloadDocument(doc: DocumentItem): void {
    const link = document.createElement('a');
    link.href = doc.pdfUrl;
    link.download = doc.fileName;
    link.click();
  }
}