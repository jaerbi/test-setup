import { Injector } from '@angular/core';
import { merge as _merge } from 'lodash-es';
import { environment } from './environments/environment';
import { XmlHttpRequestHelper } from './app/shared/services/XmlHttpRequestHelper';
import { AppConsts } from './app/shared/models/AppConsts';

export class AppPreBootstrap {
    static run(
        appRootUrl: string,
        injector: Injector,
        callback: () => void,
        resolve: any,
        reject: any
    ): void {
        AppPreBootstrap.getApplicationConfig(appRootUrl, injector, () => {
            callback();
        });
    }

    private static getApplicationConfig(
        appRootUrl: string,
        injector: Injector,
        callback: () => void
    ) {
        let type = 'GET';
        let url = appRootUrl + 'assets/' + environment.appConfig;
     
        XmlHttpRequestHelper.ajax(type, url, null, null, (result: any) => {
            AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl
            callback();
        });
    }

}
