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
import { WeUIDialog } from '../../../app/weui/dialog/weui.dialog';

@Component({
    templateUrl: 'example.html'
})
export class DialogExamplePage extends AbstractPage {

    @ViewChild('dialog1') dialog1: WeUIDialog;
    @ViewChild('dialog2') dialog2: WeUIDialog;
    @ViewChild('dialog3') dialog3: WeUIDialog;
    @ViewChild('dialog4') dialog4: WeUIDialog;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
            super(element, router, route);
    }

    showIOSDialog1(): void {
        this.dialog1.show().then(() => {
            console.log('您刚刚选择了: OK');
        }, () => {
            console.log('您刚刚选择了: NO');
        });
    }

    showIOSDialog2(): void {
        this.dialog2.show().then(() => {
            console.log('您刚刚选择了: OK');
        }, () => {
            console.log('您刚刚选择了: NO');
        });
    }

    showAndroidDialog1(): void {
        this.dialog3.show().then(() => {
            console.log('您刚刚选择了: OK');
        }, () => {
            console.log('您刚刚选择了: NO');
        });
    }

    showAndroidDialog2(): void {
        this.dialog4.show().then(() => {
            console.log('您刚刚选择了: OK');
        }, () => {
            console.log('您刚刚选择了: NO');
        });
    }

}
