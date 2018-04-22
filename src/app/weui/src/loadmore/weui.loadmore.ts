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

/**
 * 加载更多
 */
@Component({
    selector: 'weui-loadmore',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `
        <i class="weui-loading" *ngIf="loading"></i>
        <span class="weui-loadmore__tips"><ng-content></ng-content></span>
    `,
    styles: [`
        :host { display: block; }
    `]
})
export class WeUILoadmore implements OnInit {

    /** 显示为分割线 */
    @Input()
    get line(): boolean {
        return this._line;
    }
    set line(line: boolean) {
        const value = toBoolean(line);
        if (this._line !== value) {
            this._line = value;
            this.updateClassMap();
        }
    }
    private _line = false;

    /** 不展示文字，只有一个小点 */
    @Input()
    get dot(): boolean {
        return this._dot;
    }
    set dot(dot: boolean) {
        const value = toBoolean(dot);
        if (this._dot !== value) {
            this._dot = value;
            this.updateClassMap();
        }
    }
    private _dot = false;

    /** 是否正在加载 */
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
            [`weui-loadmore`]: true,
            [`weui-loadmore_line`]: this.line,
            [`weui-loadmore_dot`]: this.dot,
            [`weui-loadmore_loading`]: this.loading
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

}
