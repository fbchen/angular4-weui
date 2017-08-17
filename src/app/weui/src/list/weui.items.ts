/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, HostBinding } from '@angular/core';

@Component({
    selector: 'weui-items',
    template: `<ng-content></ng-content>`
})
export class WeUIItems {

    /**
     * 控件样式，如：<code>'form'</code>对应的样式类为<code>'weui-cells_form'</code>
     */
    @Input() baseCls: string;

    /**
     * 设置基本样式
     */
    @HostBinding('class') get itemsCls(): string {
        const basicClass = (this.baseCls && 'weui-cells_' + this.baseCls) || '';
        return ['weui-cells', basicClass].join(' ');
    }

    constructor() {

    }

}
