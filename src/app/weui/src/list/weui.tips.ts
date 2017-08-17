/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'weui-tips',
    template: `<ng-content></ng-content>`
})
export class WeUITips {

     /**
     * 设置基本样式
     */
    @HostBinding('class') get basicClass() {
        return 'weui-cells__tips';
    }

    constructor() {

    }

}
