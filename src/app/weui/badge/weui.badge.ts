/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input } from '@angular/core';

/**
 * 徽章
 */
@Component({
    selector: 'weui-badge',
    template: `
        <span class="weui-badge weui-badge_{{color}}"
             [ngClass]="{'weui-badge_dot': dot !== undefined && dot !== null}"><ng-content></ng-content></span>`
})
export class WeUIBadge {

    /**
     * 颜色，取值：default、primary、warn等。默认为default。<br>
     * 自定义的颜色名称与色值，可以定义在 工程根目录/src/theme/variables.scss 文件中的 $colors 对象。
     */
    @Input() color = 'default';

    /**
     * 点
     */
    @Input() dot: any;

    constructor() {

    }

}
