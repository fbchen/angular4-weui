/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { OnInit, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

export abstract class AbstractPage implements OnInit {

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {

    }

    ngOnInit() {
        const el: HTMLElement = this.element.nativeElement;
        const page: Element = el.firstElementChild;

        this.route.url.forEach((value: UrlSegment[]) => {
            page.classList.add('slideIn', value[0].path);
        });

        page.addEventListener('animationend', () => {
            page.classList.remove('slideIn');
            page.classList.add('js_show');
        });
    }

    home(): void {
        this.router.navigate(['/']);
    }
}
