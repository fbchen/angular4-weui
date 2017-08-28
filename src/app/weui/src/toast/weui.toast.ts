/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, HostBinding, OnChanges } from '@angular/core';
import { SimpleChange, SimpleChanges, Renderer2, ElementRef } from '@angular/core';

/**
 * Toast - 弹出式提示
 */
@Component({
    selector: 'weui-toast',
    template: `
        <div class="weui-mask_transparent"></div>
        <div class="weui-toast">
            <i class="weui-icon-success-no-circle weui-icon_toast" *ngIf="success"></i>
            <p class="weui-toast__content" *ngIf="success">{{ content || defaults.successText}}</p>
            <i class="weui-loading weui-icon_toast" *ngIf="loading"></i>
            <p class="weui-toast__content" *ngIf="loading">{{ content || defaults.loadingText}}</p>
        </div>
    `
})
export class WeUIToast implements OnChanges {

    /**
     * @i18n
     */
    defaults: any = {
        loadingText: '数据加载中',
        successText: '操作成功'
    };

    /**
     * 内容
     */
    @Input() content: string;

    /**
      * 状态，取值：loading, success
      */
    @Input() status: string;

    /**
     * 状态：正在加载
     */
    @Input() loading = false;

    /**
     * 状态：操作成功
     */
    @Input() success = true;

    /**
     * 隐藏对象
     */
    @Output() deactivate = new EventEmitter<any>();

    /**
     * 样式控制
     */
    @HostBinding('class.weui-hide') get hideCls(): boolean {
        return !this.shown;
    }

    /** 已显示否 */
    private shown = false;

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef) {

    }

    ngOnChanges(changes: SimpleChanges): void {
        const status: SimpleChange = changes['status'];
        if (status) {
            if (status.currentValue === 'loading') {
                this.success = !(this.loading = true);
            }
            if (status.currentValue === 'success') {
                this.loading = !(this.success = true);
            }
        }
    }

    /**
     * 显示
     */
    show(): void {
        this.shown = true;
        if (this.success) {
            setTimeout(() => { this.hide(); }, 2000);
        }
    }

    /**
     * 隐藏
     */
    hide(): void {
        this.shown = false;
        this.deactivate.emit();
    }

}
