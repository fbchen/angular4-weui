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
import { WeUIToast, Layer } from '../../../app/weui';

@Component({
    templateUrl: 'example.html'
})
export class ToastExamplePage extends AbstractPage {

    @ViewChild('toast1') toast1: WeUIToast;
    @ViewChild('toast2') toast2: WeUIToast;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute,
        public layer: Layer) {
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

    showToast2(): void {
        this.layer.showSuccess();
    }

    showLoadingToast2(): void {
        const toast = this.layer.showLoading();

        setTimeout(() => {
            toast.hide(); // 隐藏Toast
        }, 2000);
    }

}
