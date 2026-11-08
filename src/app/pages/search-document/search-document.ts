import { DOCUMENT } from '@angular/common';
import { afterNextRender, Component, DestroyRef, inject, Injector, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import type Shepherd from 'shepherd.js';
import { DocumentTable } from '../../shared/components/document-table/document-table';
import { Navbar } from '../../shared/components/navbar/navbar';
import { TabSearch } from '../../shared/components/tab-search/tab-search';

const folderStep = 'select-folder';
const downloadStep = 'download-pdf';
const folderSearchTarget = '.mat-mdc-tab-body-active [data-tour-folder-search]';
const downloadTarget = '[data-tour-download]';

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
  imports: [DocumentTable, MatButtonModule, Navbar, TabSearch],
  templateUrl: './search-document.html',
  styleUrl: './search-document.scss',
})
export class SearchDocument {
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private tour?: InstanceType<typeof Shepherd.Tour>;

  readonly tourLoading = signal(false);
  readonly tourLoadFailed = signal(false);
  filters: DocumentFilters = {};

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.tour?.isActive()) {
        this.tour.cancel();
      }
    });
  }

  onFiltersChange(filters: DocumentFilters): void {
    this.filters = filters;

    const tour = this.tour;
    if (tour?.isActive()) {
      // Wait for Angular to render the filtered rows before positioning the next step.
      afterNextRender(
        () => {
          if (tour.isActive()) {
            const hasDownload = this.filters.folderList && this.document.querySelector(downloadTarget);
            tour.show(hasDownload ? downloadStep : folderStep);
          }
        },
        { injector: this.injector },
      );
    }
  }

  async startTour(): Promise<void> {
    if (this.tourLoading() || this.tour?.isActive()) {
      return;
    }

    // Load Shepherd in the browser when the user opens the guide.
    this.tourLoading.set(true);
    this.tourLoadFailed.set(false);
    try {
      const { default: Shepherd } = await import('shepherd.js');
      if (this.destroyRef.destroyed) {
        return;
      }

      const tour = new Shepherd.Tour({
        keyboardNavigation: false,
        defaultStepOptions: {
          cancelIcon: { enabled: true, label: 'Fermer le guide' },
          classes: 'document-tour-step',
          highlightClass: 'document-tour-target',
          scrollTo: { block: 'center', inline: 'nearest' },
        },
      });

      tour.addStep({
        id: folderStep,
        title: '1 sur 2 · Sélectionner un dossier',
        text: 'Choisissez Factures ou Avoir dans la liste Dossiers, puis cliquez sur Rechercher. Si la recherche ne donne aucun résultat, réinitialisez les filtres et réessayez.',
        attachTo: { element: folderSearchTarget, on: 'right' },
      });

      tour.addStep({
        id: downloadStep,
        title: '2 sur 2 · Télécharger un PDF',
        text: 'Cliquez sur le bouton Télécharger mis en évidence dans les résultats pour enregistrer le PDF et terminer le guide.',
        attachTo: { element: downloadTarget, on: 'left' },
        advanceOn: { selector: downloadTarget, event: 'click' },
      });

      this.tour = tour;
      await tour.start();
    } catch {
      this.tourLoadFailed.set(true);
    } finally {
      this.tourLoading.set(false);
    }
  }
}
