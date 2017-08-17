/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractPage } from '../abstract-page';

import { WeUINavBarItem } from '../../../app/weui';

@Component({
    templateUrl: 'example.html'
})
export class NavBarExamplePage extends AbstractPage implements OnInit {

    public activeValue: string;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
        super(element, router, route);
    }

    onActivated(item: WeUINavBarItem): void {
        this.activeValue = item.value;
    }

}
