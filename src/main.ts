import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withInterceptorsFromDi())   // ✅ new way to provide HttpClient
  ]
})
.catch((err) => console.error(err));
