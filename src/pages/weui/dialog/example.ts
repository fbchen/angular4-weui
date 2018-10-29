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
import { WeUIDialog, Layer } from '../../../app/weui';

@Component({
    templateUrl: 'example.html'
})
export class DialogExamplePageComponent extends AbstractPage {

    @ViewChild('dialog1') dialog1: WeUIDialog;
    @ViewChild('dialog2') dialog2: WeUIDialog;
    @ViewChild('dialog3') dialog3: WeUIDialog;
    @ViewChild('dialog4') dialog4: WeUIDialog;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute,
        public layer: Layer) {
            super(element, router, route);
            console.log(layer);
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


    showAlert(): void {
        this.layer.showAlert('你好，世界!').then(() => {
            console.log('您刚刚选择了: OK');
        }, () => {
            console.log('您刚刚选择了: NO');
        });
    }

    showConfirm(): void {
        this.layer.showConfirm({content: '你好，世界?', title: '系统消息', btnOKText: '朕知道了'}).then(() => {
            console.log('您刚刚选择了: OK');
        }, () => {
            console.log('您刚刚选择了: NO');
        });
    }

    showSuccess(): void {
        this.layer.success('操作成功！', '标题');
    }

    showInfo(): void {
        this.layer.info('操作成功！', '标题');
    }

    showError(): void {
        this.layer.error('操作失败！', '标题');
    }

    showWarning(): void {
        this.layer.warning('操作失败！', '标题');
    }

    showDefault(): void {
        this.layer.showAlert('操作失败！', '标题', 'default');
    }

}
