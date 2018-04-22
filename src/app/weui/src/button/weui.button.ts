/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';
import { toBoolean } from '../util/lang';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[weui-button]',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `
        <i class="weui-loading" *ngIf="loading"></i>
        <ng-content></ng-content>
    `
})
export class WeUIButton implements OnInit {

    /**
     * 颜色，取值：default、primary、warn等。默认为default。<br>
     * 自定义的颜色名称与色值，可以定义在 工程根目录/src/theme/variables.scss 文件中的 $colors 对象。
     */
    @Input()
    get color(): string {
        return this._color;
    }
    set color(color: string) {
        if (this._color !== color) {
            this._color = color;
            this.updateClassMap();
        }
    }
    private _color = 'default';

    /**
     * 简朴样式 (主要出现此属性)
     */
    @Input()
    get plain(): boolean {
        return this._plain;
    }
    set plain(plain: boolean) {
        const value = toBoolean(plain);
        if (this._plain !== value) {
            this._plain = value;
            this.updateClassMap();
        }
    }
    private _plain = false;

    /**
     * 按钮大小 (主要出现此属性)
     */
    @Input()
    get mini(): boolean {
        return this._mini;
    }
    set mini(mini: boolean) {
        const value = toBoolean(mini);
        if (this._mini !== value) {
            this._mini = value;
            this.updateClassMap();
        }
    }
    private _mini = false;

    /**
     * 正在加载
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
     * 禁用样式
     */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(disabled: boolean) {
        const value = toBoolean(disabled);
        if (this._disabled !== value) {
            this._disabled = value;
            this.updateClassMap();
        }
    }
    private _disabled = false;


    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService) {

    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-btn`]: true,
            [`weui-btn_mini`]: this.mini,
            [`weui-btn_loading`]: this.loading,
            [`weui-btn_${this.color}`]: this.color && !this.plain,
            [`weui-btn_plain-${this.color}`]: this.color && this.plain,
            [`weui-btn_disabled`]: this.disabled,
            [`weui-btn_plain-disabled`]: this.disabled && this.plain
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

}
