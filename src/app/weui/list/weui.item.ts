/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Renderer, ElementRef, HostBinding } from '@angular/core';

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
export class WeUIItem {
    /**
     * 样式
     */
    @Input() baseCls: string;

    /**
     * 额外样式
     */
    @Input() additionalCls: string;

    /**
     * 设置基本样式
     */
    @HostBinding('class') get itemCls(): string {
        const basicCls = (this.baseCls && 'weui-cell_' + this.baseCls) || '';
        return ['weui-cell weui-item', basicCls, (this.additionalCls || '')].join(' ');
    }

    constructor(private _renderer: Renderer, private _elementRef: ElementRef) {

    }

    addClass(cls: string): void {
        this._renderer.setElementClass(this._elementRef.nativeElement, cls, true);
    }

}
