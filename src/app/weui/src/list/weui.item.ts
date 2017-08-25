/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Renderer2, ElementRef, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'weui-item',
    template: `
        <div class="weui-cell__hd">
            <ng-content select="[weui-start]"></ng-content>
        </div>
        <div class="weui-cell__bd">
            <ng-content select="[weui-content]"></ng-content>
            <ng-content></ng-content>
        </div>
        <div class="weui-cell__ft">
            <ng-content select="[weui-last]"></ng-content>
        </div>
    `
})
export class WeUIItem implements OnChanges {
    /**
     * 样式
     */
    @Input() baseCls: string;


    @HostBinding('class.weui-cell') _cls_cell = true;
    @HostBinding('class.weui-item') _cls_item = true;

    ngOnChanges(changes: SimpleChanges): void {
        const changed = changes['baseCls'];
        if (changed) {
            const _el = this._elementRef.nativeElement as HTMLElement;
            if (changed.previousValue) {
                _el.classList.remove(`weui-cell_${changed.previousValue}`);
            }
            if (changed.currentValue) {
                _el.classList.add(`weui-cell_${changed.currentValue}`);
            }
        }
    }

    constructor(private _renderer: Renderer2, private _elementRef: ElementRef) {

    }

    addClass(cls: string): void {
        this._renderer.addClass(this._elementRef.nativeElement, cls);
    }

}
