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

import { WeUITopTips, Layer } from '../../../app/weui';

@Component({
    templateUrl: 'example.html'
})
export class InputExamplePage extends AbstractPage {

    public data: any = {
        radio1: '2',
        checkbox1: ['1'],
        card: 'weui input error',
        text1: 'text1 message',
        text2: 'text2 message',
        select1: '1',
        select2: '1',
        select3: '1',
        switch2: 'open'
    };

    @ViewChild('weuiToptips') toptips: WeUITopTips;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute,
        public layer: Layer) {
        super(element, router, route);
    }

    /**
     * 显示错误提示
     */
    showError(): void {
        this.toptips.show();
    }

    showError2(): void {
        this.layer.showError('用户名不能为空！');
    }

    /**
     * 测试事件
     */
    onEvent(event: Event): void {
        const target = event.target as HTMLInputElement;
        console.log(event.type + ': ' + target.name + '=' + target.value);
    }
}
