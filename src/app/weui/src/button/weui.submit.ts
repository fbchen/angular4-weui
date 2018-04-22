/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input } from '@angular/core';

@Component({
    selector: 'weui-submit',
    preserveWhitespaces: false,
    template: `
        <button [attr.type]="type" class="weui-btn {{getColorStyle()}}"
            [ngClass]="{
                'weui-btn_disabled': disabled && plain == undefined,
                'weui-btn_plain-disabled': disabled && plain !== undefined,
                'weui-btn_loading': loading,
                'weui-btn_mini': mini !== undefined
            }">
            <i class="weui-loading" *ngIf="loading"></i>
            <ng-content></ng-content>
        </button>
    `
})
export class WeUISubmit {

    /**
     * 颜色，取值：default、primary、warn等。默认为default。<br>
     * 自定义的颜色名称与色值，可以定义在 工程根目录/src/theme/variables.scss 文件中的 $colors 对象。
     */
    @Input() color = 'default';

    /** 按钮类型 */
    @Input() type = 'submit';

    /**
     * 简朴样式 (主要出现此属性)
     */
    @Input() plain: string;

    /**
     * 按钮大小 (主要出现此属性)
     */
    @Input() mini: string;

    /**
     * 正在加载
     */
    @Input() loading = false;

    /**
     * 禁用样式
     */
    @Input() disabled = false;

    constructor() {

    }

    getColorStyle(): string {
        return 'weui-btn_' + (this.plain !== undefined ? 'plain-' : '') + this.color;
    }

}
