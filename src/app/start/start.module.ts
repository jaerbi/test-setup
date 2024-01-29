import { NgModule } from '@angular/core';
import { StartOptionComponent } from './start-option/start-option.component';
import { ImageModule } from './image/image.module';
import { CommonModule } from '@angular/common';
import { StartValidationService } from './start-validation.service';
import { StartStoreService } from './start-store.service';
import { StartStoreDictionaryService } from './start-store-dictionary.service';
import { StartService } from './start.service';
import { StartComponent } from './start.component';
import { DateTimeService } from './date-time.service';
import { StartRoutingModule } from './start-routing.module';



@NgModule({

    imports: [
        CommonModule,
        ImageModule,
        StartOptionComponent,
        StartRoutingModule,
    ],
    declarations: [
        StartComponent,
    ],
    exports: [
        StartComponent,
    ],
    providers: [
        StartService,
        StartValidationService,
        StartStoreService,
        StartStoreDictionaryService,
        DateTimeService,
    ],
})
export class StartModule { }
