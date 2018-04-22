/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';

@Component({
    selector: 'weui-title',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `<ng-content></ng-content>`
})
export class WeUITitle implements OnInit {

    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService) {

    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-cells__title`]: true
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

}
