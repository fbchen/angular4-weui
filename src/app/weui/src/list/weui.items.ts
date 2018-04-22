/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';


@Component({
    selector: 'weui-items,[weui-items]',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `<ng-content></ng-content>`
})
export class WeUIItems implements OnInit {

    /**
     * 控件样式，如：<code>'form'</code>对应的样式类为<code>'weui-cells_form'</code>
     */
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
            [`weui-cells`]: true,
            [`weui-cells_${this.baseCls}`]: this.baseCls
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

}
