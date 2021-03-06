/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';

/* WeUI Module */
import { WeUIModule } from './weui'; // 'angular-weui'

/* WeUI Example Module */
import { WeUIExampleModule } from '../pages/weui/weui.example.module';
import { WeUIExampleComponent } from '../pages/weui/weui.example';


@NgModule({
    imports: [
        HttpClientModule,
        CoreModule,
        BrowserAnimationsModule,
        WeUIModule,
        WeUIExampleModule,
        RouterModule.forRoot([])
    ],
    declarations: [
        // AppComponent
    ],
    entryComponents: [
        // AppComponent
    ],
    providers: [

    ],
    bootstrap: [
        WeUIExampleComponent
    ]
})
export class AppModule { }
