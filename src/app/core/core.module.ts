/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


/**
 * @name CoreModule
 * @description
 * CoreModule is an NgModule that provides Core Components, Directive and Pipes.
 *
 * @author fbchen 2017-03-08
 */
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class CoreModule {

    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

}


/** Export Class */
export { Page } from './page';
export { Result } from './result';
export { toResult } from './rxjs/operators/to-result';

