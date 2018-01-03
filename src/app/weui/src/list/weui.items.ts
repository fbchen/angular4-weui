/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, ElementRef, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'weui-items',
    template: `<ng-content></ng-content>`
})
export class WeUIItems implements OnChanges {

    /**
     * 控件样式，如：<code>'form'</code>对应的样式类为<code>'weui-cells_form'</code>
     */
    @Input() baseCls: string;

    @HostBinding('class.weui-cells') _cls_cells = true;

    ngOnChanges(changes: SimpleChanges): void {
        const changed = changes['baseCls'];
        if (changed) {
            const _el = this._elementRef.nativeElement as HTMLElement;
            if (changed.previousValue) {
                _el.classList.remove(`weui-cells_${changed.previousValue}`);
            }
            if (changed.currentValue) {
                _el.classList.add(`weui-cells_${changed.currentValue}`);
            }
        }
    }

    constructor(private _elementRef: ElementRef) {

    }

}
