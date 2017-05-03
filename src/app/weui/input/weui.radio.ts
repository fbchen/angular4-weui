/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, HostBinding, Renderer, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { WeUIFormControl } from './weui.form.control';


const WEUI_FORM_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WeUIRadio),
    multi: true
};

@Component({
    selector: 'weui-radio',
    providers: [WEUI_FORM_CONTROL_VALUE_ACCESSOR],
    template: `
        <label class="weui-check__label" [for]="id" (click)="onTouched()">
            <div class="weui-cell__bd">
                {{label}}<ng-content></ng-content>
            </div>
            <div class="weui-cell__ft">
                <input type="radio" class="weui-check"
                    [attr.id]="id" [attr.name]="name" [value]="value"
                    [disabled]="disabled" [(ngModel)]="innerValue">
                <span class="weui-icon-checked"></span>
            </div>
        </label>
    `
})
export class WeUIRadio extends WeUIFormControl {

    /**
     * 扩展样式
     */
    @HostBinding('class') get hostCls(): string {
        return [super.getBasicControlCls(), 'weui-check__label', (this.additionalCls || '')].join(' ');
    }

    constructor(private renderer: Renderer, private elementRef: ElementRef) {
        super(renderer, elementRef, null);
    }

}
