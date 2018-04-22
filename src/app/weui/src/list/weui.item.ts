/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Renderer2, ElementRef, OnInit, AfterContentInit, ContentChildren, QueryList } from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';
import { WeUISelect } from '../input/weui.select';

@Component({
    selector: 'weui-item,[weui-item]',
    preserveWhitespaces: false,
    providers: [UpdateClassService],
    template: `
        <div class="weui-cell__hd">
            <ng-content select="[weui-start]"></ng-content>
        </div>
        <div class="weui-cell__bd">
            <ng-content select="[weui-content]"></ng-content>
            <ng-content></ng-content>
        </div>
        <div class="weui-cell__ft">
            <ng-content select="[weui-last]"></ng-content>
        </div>
    `
})
export class WeUIItem implements OnInit, AfterContentInit {

    /** 样式 */
    @Input()
    get baseCls(): string {
        return this._baseCls;
    }
    set baseCls(baseCls: string) {
        if (this._baseCls !== baseCls) {
            this._baseCls = baseCls;
            this.updateClassMap();
        }
    }
    private _baseCls: string;


    /** 选择控件 */
    @ContentChildren(WeUISelect) selects: QueryList<WeUISelect>;


    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService) {
    }

    getHostElement(): HTMLElement {
        return this.el.nativeElement as HTMLElement;
    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-cell`]: 1,
            [`weui-item`]: 1,
            [`weui-cell_${this.baseCls}`]: this.baseCls
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    // 存在选择控件，需特殊处理
    ngAfterContentInit(): void {
        if (this.selects && this.selects.length) {
            this.addClass('weui-cell_select');

            const hostEl = this.getHostElement();
            this.selects.forEach(sel => {
                const selEl = sel.getHostElement();
                if (selEl.hasAttribute('weui-start')) {
                    this.addClass('weui-cell_select-before');
                }
                if (selEl.hasAttribute('weui-content') && hostEl.querySelectorAll('[weui-start]').length) {
                    this.addClass('weui-cell_select-after');
                }
            });
        }
    }

    addClass(cls: string): void {
        this.renderer.addClass(this.el.nativeElement, cls);
    }

}
