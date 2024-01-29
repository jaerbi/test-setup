import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RootModule } from './root.module';
import { environment } from './environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(RootModule)
    .catch(err => console.error(err));

