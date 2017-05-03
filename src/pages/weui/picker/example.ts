/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractPage } from '../abstract-page';
import { WeUIPicker } from '../../../app/weui/picker/weui.picker';
import { WeUIDatePicker } from '../../../app/weui/picker/weui.date.picker';

@Component({
    templateUrl: 'example.html'
})
export class PickerExamplePage extends AbstractPage implements OnInit {

    public menu1: any[] = [{
        label: '飞机票',
        value: 0
    }, {
        label: '火车票',
        value: 1
    }, {
        label: '的士票',
        value: 2
    }, {
        label: '公交票 (disabled)',
        disabled: true,
        value: 3
    }, {
        label: '其他',
        value: 4
    }];

    public menu2: any = [];

    @ViewChild('picker1') picker1: WeUIPicker;
    @ViewChild('picker2') picker2: WeUIPicker;
    @ViewChild('picker3') picker3: WeUIDatePicker;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
        super(element, router, route);
    }

    ngOnInit(): void {
        super.ngOnInit();

        const charCode = 'A'.charCodeAt(0);
        const options1: any[] = [];
        for (let i = 0; i < 26; i++) {
            const c = String.fromCharCode(charCode + i);
            options1[i] = { label: '字母' + c, value: c };
        }

        const options2: any[] = [];
        for (let i = 0; i < 100; i++) {
            options2[i] = { label: '数字' + (i + 1), value: i + 1 };
        }
        this.menu2 = [options1, options2];
    }

    showPicker(): void {
        this.picker1.show().then((value: any) => {
            console.log('您刚刚选择了: ', value);
        });
    }

    showMultiPicker(): void {
        this.picker2.show().then((value: any) => {
            console.log('您刚刚选择了: ', value);
        });
    }

    showDatePicker(): void {
        this.picker3.show().then((value: any) => {
            console.log('您刚刚选择了: ', value);
        });
    }

}
