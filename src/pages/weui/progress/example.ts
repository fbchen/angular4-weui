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
import { WeUIProgressBar } from '../../../app/weui';


@Component({
    templateUrl: 'example.html'
})
export class ProgressExamplePage extends AbstractPage {

    public data: any = {
        value1: 0,
        value2: 50,
        value3: 100,
        value4: 70
    };

    private uploading = false;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
            super(element, router, route);
    }

    onTerminate(progress: WeUIProgressBar): void {
        alert('你点击了终止按钮');
    }

    upload(): void {
        if (this.uploading) {
            return;
        }

        this.uploading = true;
        this.data.value1 = 0;
        this.data.value2 = 0;
        this.data.value3 = 0;
        this.data.value4 = 0;
        setTimeout(this.next.bind(this), 20);
    }

    next(): void {
        this.data.value1++;
        this.data.value2++;
        this.data.value3++;
        this.data.value4++;
        if (this.data.value1 >= 100) {
            return;
        }
        setTimeout(this.next.bind(this), 20);
    }

}
