/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'weui-progress-bar',
    template: `
        <div class="weui-progress weui-progress_{{color}}">
            <div class="weui-progress__bar">
                <div class="weui-progress__inner-bar" [style.width]="value + '%'"></div>
            </div>
            <a href="javascript:;" class="weui-progress__opr" *ngIf="canTerminate" (click)="onTerminate()">
                <i class="weui-icon-cancel"></i>
            </a>
        </div>
    `
})
export class WeUIProgressBar {

    /**
     * 颜色，取值：default、primary、warn等。默认为default。<br>
     * 自定义的颜色名称与色值，可以定义在 工程根目录/src/theme/variables.scss 文件中的 $colors 对象。
     */
    @Input() color = 'default';

    /**
     * Type of the progress bar. <br>
     * Input must be one of these values: determinate, indeterminate. Defaults to 'determinate'.<br>
     *
     * <p>In the "determinate" mode, the progress is set via the value property, which can be a whole number between 0 and 100.</p>
     * <p>In the "indeterminate" mode, the progress bar indicates that something is happening without conveying a discrete progress.</p>
     * <p>In the "indeterminate" mode, the <code>value</code> property is ignored.</p>
     */
    // @Input() type: string = 'determinate';

    /**
     * Value of the progressbar. Defaults to zero.
     */
    @Input() value = 0;

    /**
     * 是否可终止 (若为true，则显示关闭按钮)
     */
    @Input() canTerminate = true;

    /**
     * 终止事件
     */
    @Output() terminate = new EventEmitter<WeUIProgressBar>();

    constructor() {

    }

    onTerminate(): void {
        this.terminate.emit(this);
    }

}
