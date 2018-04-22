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
 * 徽章
 */
@Component({
    selector: 'weui-badge',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `<ng-content></ng-content>`
})
export class WeUIBadge implements OnInit {

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


    /** 不展示数字，只有一个小红点。 whether to show red dot without number */
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
            [`weui-badge`]: true,
            [`weui-badge_dot`]: this.dot,
            [`weui-badge_${this.color}`]: this.color
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }
}
