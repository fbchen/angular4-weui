/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, OnInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'weui-example',
    templateUrl: 'weui.example.html'
})
export class WeUIExample implements OnInit {

    constructor(public element: ElementRef, private router: Router) {
    }

    ngOnInit(): void {
        const el: HTMLElement = this.element.nativeElement;
        const page: Element = el.firstElementChild;
        page.classList.add('slideIn', 'home');
        page.addEventListener('animationend', () => {
            page.classList.remove('slideIn');
            page.classList.add('js_show');
        });
    }

    toggleCategory($event: Event): void {
        const el = $event.currentTarget as HTMLElement,
              parent = el.parentElement;
        if (parent.classList.contains('js_show')) {
            parent.classList.remove('js_show');
        } else {
            const children = parent.parentElement.children;
            for (let i = 0; i < children.length; i++) {
                children.item(i).classList.remove('js_show');
            }
            parent.classList.add('js_show');
        }
    }

    navigate($event): void {
        const el = $event.currentTarget as HTMLElement;
        const name: string = el.dataset['id'];
        this.router.navigate([name]);
    }

}
