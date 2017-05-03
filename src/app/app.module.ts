/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { CoreModule } from './core/core.module';

/* WeUI Module */
import { WeUIModule } from './weui'; // 'angular-weui'

/* WeUI Example Module */
import { WeUIExampleModule } from '../pages/weui/weui.example.module';
import { WeUIExample } from '../pages/weui/weui.example';


@NgModule({
    imports: [
        HttpModule,
        CoreModule,
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
        WeUIExample
    ]
})
export class AppModule { }
