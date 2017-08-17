/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input } from '@angular/core';

/**
 * 加载更多
 */
@Component({
    selector: 'weui-loadmore',
    template: `
        <div class="weui-loadmore" [ngClass]="{
                'weui-loadmore_line': line !== undefined && line !== null,
                'weui-loadmore_dot': dot !== undefined && dot !== null }">
            <i class="weui-loading" *ngIf="loading"></i>
            <span class="weui-loadmore__tips"><ng-content></ng-content></span>
        </div>
    `
})
export class WeUILoadmore {

    /**
     * 分割线
     */
    @Input() line: any;

    /**
     * 点
     */
    @Input() dot: any;

    /**
     * 正在加载
     */
    @Input() loading = false;

    constructor() {

    }

}
