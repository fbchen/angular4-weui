/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractPage } from '../abstract-page';

@Component({
    templateUrl: 'example.html'
})
export class ListExamplePage extends AbstractPage {

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
            super(element, router, route);
    }

    /**
     * 测试事件
     */
    onClickLink(event: Event): void {
        console.log(event);
    }
}
