import { ToastrModule } from 'ngx-toastr';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(), provideHttpClient(),provideHttpClient(),    
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut: 3000,
        progressBar: true,
        closeButton: true,
        preventDuplicates: true,
        positionClass: 'toast-bottom-left',
      })
    ),
  ]
};