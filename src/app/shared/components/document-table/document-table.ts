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
  status: boolean;
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
      status: true,
      pdfUrl: 'exemple.pdf'
    },
    {
      code: 'FAC-2026-001246',
      fileName: 'facture_001246.pdf',
      folder: 'Factures',
      contractNumber: '654123988',
      partnerName: 'FUSE',
      subsidiary: 'Renault France',
      companyCode: 'FR01',
      creationDate: new Date('2026-07-06'),
      status: false,
      pdfUrl: 'exemple.pdf'
    },
    {
      code: 'FAC-2026-001247',
      fileName: 'facture_001247.pdf',
      folder: 'Factures',
      contractNumber: '654123989',
      partnerName: 'Capgemini France',
      subsidiary: 'Renault Digital',
      companyCode: 'FR02',
      creationDate: new Date('2026-07-05'),
      status: true,
      pdfUrl: 'exemple.pdf',
    },
    {
      code: 'FAC-2026-001248',
      fileName: 'facture_001248.pdf',
      folder: 'Avoir',
      contractNumber: '654123990',
      partnerName: 'TotalEnergies',
      subsidiary: 'Renault France',
      companyCode: 'FR01',
      creationDate: new Date('2026-07-04'),
      status: true,
      pdfUrl: 'exemple.pdf'
    },
    {
      code: 'FAC-2026-001249',
      fileName: 'facture_001249.pdf',
      folder: 'Factures',
      contractNumber: '654123991',
      partnerName: 'Michelin Fleet Solutions',
      subsidiary: 'Renault España',
      companyCode: 'ES01',
      creationDate: new Date('2026-07-03'),
      status: false,
      pdfUrl: 'exemple.pdf'
    },
    {
      code: 'FAC-2026-001250',
      fileName: 'facture_001250.pdf',
      folder: 'Factures',
      contractNumber: '654123992',
      partnerName: 'Publicis Conseil',
      subsidiary: 'Renault France',
      companyCode: 'FR01',
      creationDate: new Date('2026-07-02'),
      status: false,
      pdfUrl: 'exemple.pdf'
    },
    {
      code: 'FAC-2026-001251',
      fileName: 'facture_001251.pdf',
      folder: 'Avoir',
      contractNumber: '654123993',
      partnerName: 'Orange Business',
      subsidiary: 'Renault Digital',
      companyCode: 'FR02',
      creationDate: new Date('2026-07-01'),
      status: true,
      pdfUrl: 'exemple.pdf'
    },
    {
      code: 'FAC-2026-001252',
      fileName: 'facture_001252.pdf',
      folder: 'Factures',
      contractNumber: '654123994',
      partnerName: 'Valeo Technologies',
      subsidiary: 'Renault Deutschland',
      companyCode: 'DE01',
      creationDate: new Date('2026-06-29'),
      status: true,
      pdfUrl: 'exemple.pdf'
    },
    {
      code: 'FAC-2026-001253',
      fileName: 'facture_001253.pdf',
      folder: 'Factures',
      contractNumber: '654123995',
      partnerName: 'Sopra Steria',
      subsidiary: 'Renault Digital',
      companyCode: 'FR02',
      creationDate: new Date('2026-06-28'),
      status: true,
      pdfUrl: 'exemple.pdf'
    },
    {
      code: 'FAC-2026-001254',
      fileName: 'facture_001254.pdf',
      folder: 'Factures',
      contractNumber: '654123996',
      partnerName: 'Dassault Systèmes',
      subsidiary: 'Renault France',
      companyCode: 'FR01',
      creationDate: new Date('2026-06-25'),
      status: true,
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
      const validationOk = f.valide == null || doc.status === f.valide;

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
        validationOk &&
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
