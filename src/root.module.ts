import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RootRoutingModule } from './root-routing.module';
import { RootComponent } from './root.component';
import { AppModule } from './app/app.module';
import { HttpClientModule } from '@angular/common/http';
import { PlatformLocation } from '@angular/common';;
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';


export function getBaseHref(platformLocation: PlatformLocation): string {
    let baseUrl = platformLocation.getBaseHrefFromDOM();
    if (baseUrl) {
        return baseUrl;
    }

    return '/';
}

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppModule,
        HttpClientModule,
        RootRoutingModule,
        MatDialogModule,
        MatSnackBarModule,
    ],
    declarations: [
        RootComponent
    ],
    bootstrap: [RootComponent],
})
export class RootModule {

}
