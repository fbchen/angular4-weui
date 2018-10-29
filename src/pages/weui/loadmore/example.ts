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
import { WeUILoadmore } from '../../../app/weui';

@Component({
    templateUrl: 'example.html'
})
export class LoadmoreExamplePageComponent extends AbstractPage {

    @ViewChild('loadmore') loadmore: WeUILoadmore;

    public loadmoreText: string;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
            super(element, router, route);
    }

    load(): void {
        this.loadmore.line = null;
        this.loadmore.loading = true;
        this.loadmoreText = '正在加载';
        setTimeout(() => {
            this.loadmore.line = true;
            this.loadmore.loading = false;
            this.loadmoreText = '暂无数据';

        }, 2000);
    }
}
