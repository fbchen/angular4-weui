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
export class MsgExamplePage extends AbstractPage {

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
        super(element, router, route);
    }

}


@Component({
    templateUrl: 'succ_example.html'
})
export class MsgSuccExamplePage extends AbstractPage {

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
        super(element, router, route);
    }

}


@Component({
    templateUrl: 'warn_example.html'
})
export class MsgWarnExamplePage extends AbstractPage {

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
        super(element, router, route);
    }

}
