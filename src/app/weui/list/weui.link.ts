/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, HostBinding } from '@angular/core';
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
export class WeUILink {

    /**
     * 不显示最右边的箭头。默认为false，即：显示箭头。
     */
    @Input() noPushArrow = false;

    /**
     * 样式
     */
    @Input() baseCls: string;

    /**
     * 额外样式
     */
    @Input() additionalCls: string;

    /**
     * 链接
     */
    @Input() set href(_href: string) {
        this._href = this.sanitizer.bypassSecurityTrustUrl(_href);
    }

    _href: SafeUrl;

    /**
     * 设置基本样式
     */
    @HostBinding('class') get itemCls(): string {
        const basicCls = (this.baseCls && 'weui-cell_' + this.baseCls) || '';
        const arrawCls = this.noPushArrow ? 'weui-cell_access-noarrow' : '';
        return ['weui-cell weui-item weui-cell_access', basicCls, arrawCls, (this.additionalCls || '')].join(' ');
    }

    constructor(private sanitizer: DomSanitizer) {

    }

}
