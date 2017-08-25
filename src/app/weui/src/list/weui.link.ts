/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Renderer2, ElementRef, Input, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
    selector: 'weui-link',
    template: `
        <a class="weui-cell_access" [href]="_href">
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
        </a>
    `
})
export class WeUILink implements OnChanges {

    /**
     * 不显示最右边的箭头。默认为false，即：显示箭头。
     */
    @Input() noPushArrow = false;

    /**
     * 样式
     */
    @Input() baseCls: string;

    /**
     * 链接
     */
    @Input() set href(_href: string) {
        this._href = this.sanitizer.bypassSecurityTrustUrl(_href);
    }

    _href: SafeUrl;

    @HostBinding('class.weui-cell') _cls_cell = true;
    @HostBinding('class.weui-item') _cls_item = true;
    @HostBinding('class.weui-cell_access') _cls_cell_access = true;
    @HostBinding('class.weui-cell_access-noarrow') get _cls_cell_access_noarrow() {
        return this.noPushArrow;
    }

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

    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        private sanitizer: DomSanitizer) {

    }

}
