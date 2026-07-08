import { ApplicationConfig, provideBrowserGlobalErrorListeners, LOCALE_ID  } from '@angular/core';
import { provideRouter } from '@angular/router';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'fr-FR'
    }
  ]
};
