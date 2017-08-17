/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';

/**
 * TopTips - 顶部提示
 */
@Component({
    selector: 'weui-toptips',
    template: '<div class="weui-toptips weui-toptips_warn" [ngStyle]="{display: display}">{{content}}</div>'
})
export class WeUITopTips {

    /**
     * 内容
     */
    @Input() content: string;

    /**
     * 隐藏对象
     */
    @Output() deactivate = new EventEmitter<any>();

    /**
     * 样式控制
     */
    get display(): string {
        return this.shown ? 'block' : 'none';
    }

    /**
     * 已显示否
     * @internal
     */
    private shown = false;

    constructor() {

    }

    /**
     * 显示
     */
    show(): void {
        this.shown = true;
        setTimeout(() => { this.hide(); }, 2000);
    }

    /**
     * 隐藏
     */
    hide(): void {
        this.shown = false;
        this.deactivate.emit();
    }

}
