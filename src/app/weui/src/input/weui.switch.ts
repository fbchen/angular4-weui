/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Renderer2, ElementRef, forwardRef, Optional, Inject, OnInit } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { UpdateClassService } from '../core/service/update.class.service';


const WEUI_FORM_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WeUISwitch),
    multi: true
};

@Component({
    selector: 'weui-switch',
    preserveWhitespaces: false,
    providers: [ UpdateClassService, WEUI_FORM_CONTROL_VALUE_ACCESSOR ],
    template: `
        <div class="weui-cell__bd">
            {{label}}<ng-content select="label"></ng-content>
        </div>
        <div class="weui-cell__ft">
            <label [for]="id" class="weui-switch-cp">
                <input type="checkbox" class="weui-switch-cp__input"
                    [attr.id]="id" [(ngModel)]="checked">
                <div class="weui-switch-cp__box"></div>
            </label>
        </div>
    `
})
export class WeUISwitch extends DefaultValueAccessor implements OnInit {
    public static count = 0;

    @Input() id: string;

    @Input() name: string;

    @Input() value: any = 'on';

    /**
     * 控件 label
     */
    @Input() label: string;

    /**
     * 是否禁用
     */
    @Input() disabled = false;

    /** 是否已选中 */
    public get checked(): boolean {
        return this._checked;
    }
    public set checked(checked: boolean) {
        this._checked = checked;
        this.emitValue();
    }
    private _checked = false;

    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService,
        @Optional() @Inject(COMPOSITION_BUFFER_MODE) protected compositionMode: boolean) {
        super(renderer, el, compositionMode);
        this.id = `weui-switch-${++WeUISwitch.count}`;
    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-cell`]: 1,
            [`weui-cell_switch`]: 1
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    /**
     * Write a new value to the element. (From ControlValueAccessor interface)
     */
    writeValue(value: any): void {
        this.checked = this.value === value;
    }

    /** 勾选框的选择状态发生变化时，发射出实际值 */
    emitValue(): void {
        const value = this.checked ? this.value : null;
        // view -> model -> outside world (ie. NgModel on this control)
        this.onChange(value);
    }

}
