/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Directive, Host, Renderer, ElementRef, Optional, AfterViewInit } from '@angular/core';
import { WeUIItem } from '../list/weui.item';

@Directive({
    selector: 'select'
})
export class WeUISelect implements AfterViewInit {

    constructor(
        private _renderer: Renderer,
        private _elementRef: ElementRef,
        @Optional() @Host() private _container: WeUIItem) {

    }

    ngAfterViewInit(): void {
        if (!this._container) {
            return;
        }

        const nativeEl = this._elementRef.nativeElement as HTMLElement;
        this._renderer.setElementClass(nativeEl, 'weui-select', true);
        this._container.addClass('weui-cell_select');

        const parentEl = nativeEl.parentElement;
        if (parentEl.classList.contains('weui-cell__hd')) {
            this._container.addClass('weui-cell_select-before');
        }
        if (parentEl.classList.contains('weui-cell__bd')) {
            this._container.addClass('weui-cell_select-after');
        }
    }

}
