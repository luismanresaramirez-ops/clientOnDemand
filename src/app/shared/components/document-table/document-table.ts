import { AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

export interface DocumentItem {
  code: string;
  fileName: string;
  folder: string;
  contractNumber: string;
  partnerName: string;
  subsidiary: string;
  companyCode: string;
  creationDate: Date;
  status: string;
  pdfUrl: string;
}

@Component({
  selector: 'app-document-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule
  ],
  templateUrl: './document-table.html',
  styleUrl: './document-table.scss'
})
export class DocumentTable implements AfterViewInit, OnChanges {
  @Input() filters: any;

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

  documents: DocumentItem[] = [
    {
      code: 'FAC-2026-001245',
      fileName: 'facture_001245.pdf',
      folder: 'Factures',
      contractNumber: '654123987',
      partnerName: 'Renault Retail Group',
      subsidiary: 'Renault France',
      companyCode: 'FR01',
      creationDate: new Date('2026-07-07'),
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
      creationDate: new Date('2026-07-06'),
      status: 'Validé',
      pdfUrl: 'exemple.pdf'
    }
  ];

  dataSource = new MatTableDataSource<DocumentItem>(this.documents);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnChanges(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    const f = this.filters;

    if (!f) {
      this.dataSource.data = this.documents;
      return;
    }

    this.dataSource.data = this.documents.filter(doc => {
      const fromOk =
        !f.creationDateFrom ||
        doc.creationDate >= new Date(f.creationDateFrom);

      const toOk =
        !f.creationDateTo ||
        doc.creationDate <= new Date(f.creationDateTo);

      return (
        (!f.documentCode || doc.code.toLowerCase().includes(f.documentCode.toLowerCase())) &&
        (!f.folderList || f.folderList === 'Tous' || doc.folder === f.folderList) &&
        (!f.contractNumber || doc.contractNumber.includes(f.contractNumber)) &&
        (!f.partnerName || doc.partnerName.toLowerCase().includes(f.partnerName.toLowerCase())) &&
        (!f.subsidiary || doc.subsidiary === f.subsidiary) &&
        (!f.companyCode || doc.companyCode === f.companyCode) &&
        (!f.valide || doc.status === 'Validé') &&
        fromOk &&
        toOk
      );
    });

    this.paginator?.firstPage();
  }
  openDocument(doc: DocumentItem): void {
    window.open(doc.pdfUrl, '_blank');
  }

  downloadDocument(doc: DocumentItem): void {
    const link = window.document.createElement('a');
    link.href = doc.pdfUrl;
    link.download = doc.fileName;
    link.click();
  }

  private parseDate(date: string): Date {
    const [day, month, year] = date.split('/').map(Number);
    return new Date(year, month - 1, day);
  }
}