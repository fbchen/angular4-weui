/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, HostBinding, Renderer2, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { WeUIFormControl } from './weui.form.control';


const WEUI_FORM_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WeUISwitch),
    multi: true
};

@Component({
    selector: 'weui-switch',
    template: `
        <div class="weui-cell__bd">
            {{label}}<ng-content select="label"></ng-content>
        </div>
        <div class="weui-cell__ft">
            <label [for]="id" class="weui-switch-cp">
                <input type="checkbox" class="weui-switch-cp__input"
                    [attr.id]="id" [attr.name]="name" [value]="value" [checked]="checked" [(ngModel)]="innerValue" />
                <div class="weui-switch-cp__box"></div>
            </label>
        </div>
    `,
    providers: [WEUI_FORM_CONTROL_VALUE_ACCESSOR]
})
export class WeUISwitch extends WeUIFormControl {

    /** @internal */
    checked = false;

    /**
     * The value of the input ngModel
     *
     * @internal (view -> model)
     */
    set innerValue(checked: boolean) {
        if (this._value !== checked) {
            this._value = checked || false;
            // view -> model -> outside world (ie. NgModel on this control)
            this.onChange(this._value ? this.value : '');
        }
    }

    /**
     * Write a new value to the element.
     *
     * @internal (From ControlValueAccessor interface)
     */
    writeValue(value: any): void {
        this.checked = this.value === value;
        super.writeValue(this.checked);
    }

    /**
     * 扩展样式
     */
    @HostBinding('class') get hostCls(): string {
        return [super.getBasicControlCls(), 'weui-cell_switch', (this.additionalCls || '')].join(' ');
    }

    constructor(private renderer: Renderer2, private elementRef: ElementRef) {
        super(renderer, elementRef, null);
        this.value = 'on'; // default value
    }

}
