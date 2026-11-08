import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatSelectHarness } from '@angular/material/select/testing';
import { provideRouter } from '@angular/router';

import { SearchDocument } from './search-document';

describe('SearchDocument', () => {
  let component: SearchDocument;
  let fixture: ComponentFixture<SearchDocument>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchDocument],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchDocument);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('guides the user from a folder search to downloading a PDF', async () => {
    const page = fixture.nativeElement as HTMLElement;
    page.querySelector<HTMLButtonElement>('.search-sidebar button')!.click();
    await vi.waitFor(() => {
      expect(document.querySelector('.shepherd-title')?.textContent).toContain('1 sur 2');
    });

    const loader = TestbedHarnessEnvironment.loader(fixture);
    const folders = await loader.getHarness(MatSelectHarness.with({ selector: '[formControlName="folderList"]' }));
    const search = page.querySelector<HTMLButtonElement>('[data-tour-folder-search] button')!;

    await folders.clickOptions({ text: 'FUSE' });
    search.click();
    await fixture.whenStable();
    expect(document.querySelector('.shepherd-title')?.textContent).toContain('1 sur 2');

    await folders.clickOptions({ text: 'Avoir' });
    search.click();
    await fixture.whenStable();
    await vi.waitFor(() => {
      expect(document.querySelector('.shepherd-element:not([hidden]) .shepherd-title')?.textContent)
        .toContain('2 sur 2');
    });

    const download = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});
    try {
      page.querySelector<HTMLButtonElement>('[data-tour-download].document-tour-target')!.click();
      expect(download).toHaveBeenCalledOnce();
      expect(document.querySelector('.shepherd-element')).toBeNull();
    } finally {
      download.mockRestore();
    }
  });
});
