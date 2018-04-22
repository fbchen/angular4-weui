/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, HostBinding, OnInit } from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';
import { toBoolean } from '../util/lang';


/**
 * Toast - 弹出式提示
 */
@Component({
    selector: 'weui-toast',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
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
export class WeUIToast implements OnInit {

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
    @Input()
    get status(): string {
        return this._status;
    }
    set status(status: string) {
        if (this._status !== status) {
            this._status = status;
            this.updateStatus();
            this.updateClassMap();
        }
    }
    private _status: string;

    /**
     * 状态：正在加载
     */
    @Input()
    get loading(): boolean {
        return this._loading;
    }
    set loading(loading: boolean) {
        const value = toBoolean(loading);
        if (this._loading !== value) {
            this._loading = value;
            this.updateClassMap();
        }
    }
    private _loading = false;

    /**
     * 状态：操作成功
     */
    @Input()
    get success(): boolean {
        return this._success;
    }
    set success(success: boolean) {
        const value = toBoolean(success);
        if (this._success !== value) {
            this._success = value;
            this.updateClassMap();
        }
    }
    private _success = true;


    /**
     * 隐藏对象
     */
    @Output() close = new EventEmitter<any>();

    /**
     * 样式控制
     */
    @HostBinding('class.weui-hide') get hideCls(): boolean {
        return !this.shown;
    }

    /** 已显示否 */
    private shown = false;

    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService) {

    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {

    }

    private updateStatus(): void {
        if (this.status === 'loading') {
            this.success = !(this.loading = true);
        }
        if (this.status === 'success') {
            this.loading = !(this.success = true);
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
        this.close.emit();
    }

}
