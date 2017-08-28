/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Renderer2, ElementRef, Inject, Optional, HostBinding } from '@angular/core';
import { DefaultValueAccessor } from '@angular/forms';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

/**
 * 输入类表单控件。Do NOT use me as element directly!
 */
// AOT编译时提示 Cannot determine the module for class WeUIFormControl in **.ts, so comment out `abstract`
@Component({
    selector: 'WeUIFormControl',
    template: ``
})
export /*abstract*/ class WeUIFormControl extends DefaultValueAccessor {
    /** @internal */
    public static count = 0;

    /**
     * 控件ID
     */
    @Input() id: string;

    /**
     * 控件name
     */
    @Input() name: string;

    /**
     * 控件 label
     */
    @Input() label: string;

    /**
     * 是否禁用
     */
    @Input() disabled = false;

    /**
     * value 属性为 input 元素设定值。<br>
     *
     * 对于不同的输入类型，value 属性的用法也不同：<ul>
     * <li> type="button", "reset", "submit" - 定义按钮上的显示的文本 </li>
     * <li> type="text", "password", "hidden" - 定义输入字段的初始值 </li>
     * <li> type="checkbox", "radio", "image" - 定义与输入相关联的值 </li>
     * </ul>
     *
     * <p>注释：&lt;input type="checkbox"&gt; 和 &lt;input type="radio"&gt; 中必须设置 <code>value</code> 属性。</p>
     * <p>注释：value 属性无法与 <input type="file"> 一同使用。</p>
     */
    @Input() value: any;

    /**
     * The internal data model
     *
     * @internal
     */
    protected _value: any = '';

    /**
     * The value of the input ngModel
     *
     * @internal (model -> view)
     */
    get innerValue() {
        return this._value;
    }

    /**
     * The value of the input ngModel
     *
     * @internal (view -> model)
     */
    set innerValue(newValue: any) {
        if (this._value !== newValue) {
            this._value = newValue;
            // view -> model -> outside world (ie. NgModel on this control)
            this.onChange(newValue);
        }
    }

    /** @internal */
    public static registerControl(): string {
        return 'weui-control-' + (++WeUIFormControl.count).toString();
    }

    @HostBinding('class.weui-cell') _cls_cell = true;
    @HostBinding('class.weui-control') _cls_control = true;

    constructor(
        @Inject(Renderer2) private __renderer: Renderer2,
        @Inject(ElementRef) private __elementRef: ElementRef,
        @Optional() @Inject(COMPOSITION_BUFFER_MODE) private __compositionMode: boolean) {
        super(__renderer, __elementRef, __compositionMode);
        this.id = WeUIFormControl.registerControl();
    }

    /**
     * Write a new value to the element.
     *
     * @internal (From ControlValueAccessor interface)
     */
    writeValue(value: any): void {
        this._value = value;
    }

    /**
     * @internal (From ControlValueAccessor interface)
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
