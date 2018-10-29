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
import { WeUIActionSheet, Layer } from '../../../app/weui';

@Component({
    templateUrl: 'example.html'
})
export class ActionsheetExamplePageComponent extends AbstractPage {

    public actionsheetMenu = [
        {text: '示例菜单1', value: '01', foo: 'dd', bar: '123'},
        {text: '示例菜单2', value: '02'},
        {text: '示例菜单3', value: '03'},
        {text: '示例菜单4', value: '04'}
    ];

    @ViewChild('actionsheet1') actionsheet1: WeUIActionSheet;
    @ViewChild('actionsheet2') actionsheet2: WeUIActionSheet;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute,
        public layer: Layer) {
            super(element, router, route);
    }

    showIOSActionSheet(): void {
        this.actionsheet1.show().then((menu: any) => {
            console.log('您刚刚选择了:', menu);
        });
    }

    showAndroidActionSheet(): void {
        this.actionsheet2.show().then((menu: any) => {
            console.log('您刚刚选择了:', menu);
        });
    }

    showIOSActionSheet2(): void {
        const actionsheetMenu = [
            {text: '示例菜单5', value: '05'},
            {text: '示例菜单6', value: '06'},
            {text: '示例菜单7', value: '07'}
        ];
        this.layer.showActionsheet(actionsheetMenu).then((menu: any) => {
            console.log('您刚刚选择了:', menu);
        });
    }

}
