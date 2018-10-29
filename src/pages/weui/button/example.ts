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
import { WeUIButton } from '../../../app/weui';

@Component({
    templateUrl: 'example.html'
})
export class ButtonExamplePageComponent extends AbstractPage {

    @ViewChild('button')
    private button: WeUIButton;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
            super(element, router, route);
    }

    /**
     * 切换“正在加载/加载完毕”
     */
    toggleLoading($event): void {
        this.button.loading = !this.button.loading;
    }
}
