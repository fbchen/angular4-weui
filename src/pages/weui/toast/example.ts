/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractPage } from '../abstract-page';
import { WeUIToast } from '../../../app/weui/toast/weui.toast';

@Component({
    templateUrl: 'example.html'
})
export class ToastExamplePage extends AbstractPage {

    @ViewChild('toast1') toast1: WeUIToast;
    @ViewChild('toast2') toast2: WeUIToast;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
        super(element, router, route);
    }

    showToast(): void {
        this.toast1.show();
    }

    showLoadingToast(): void {
        this.toast2.show();

        // 隐藏Toast
        setTimeout(() => {
            this.toast2.hide();
        }, 2000);
    }

}
