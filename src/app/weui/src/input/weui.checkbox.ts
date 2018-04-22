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
import { toArray } from '../util/lang';

const WEUI_FORM_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WeUICheckbox),
    multi: true
};

@Component({
    selector: 'weui-checkbox',
    preserveWhitespaces: false,
    providers: [ UpdateClassService, WEUI_FORM_CONTROL_VALUE_ACCESSOR ],
    template: `
        <label class="weui-check__label" [for]="id" (click)="onTouched()">
            <div class="weui-cell__hd">
                <input type="checkbox" class="weui-check"
                    [attr.id]="id" [(ngModel)]="checked" [disabled]="disabled">
                <i class="weui-icon-checked"></i>
            </div>
            <div class="weui-cell__bd">
                {{label}}<ng-content></ng-content>
            </div>
        </label>
    `
})
export class WeUICheckbox extends DefaultValueAccessor implements OnInit {
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

    /** 选中的值（可以多选，因此存储为数组） */
    private values: any[] = [];

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
        this.id = `weui-checkbox-${++WeUICheckbox.count}`;
    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-cell`]: 1,
            [`weui-check__label`]: 1
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    /**
     * Write a new value to the element. (From ControlValueAccessor interface)
     */
    writeValue(value: any): void {
        this.values = toArray(value);
        this._checked = this.values.indexOf(this.value) >= 0;
    }

    /** 勾选框的选择状态发生变化时，发射出实际值 */
    emitValue(): void {
        const index = this.values.indexOf(this.value);
        if (this.checked && index === -1) {
            this.values.push(this.value);
        } else if (!this.checked && index >= 0) {
            this.values.splice(index, 1);
        }
        // view -> model -> outside world (ie. NgModel on this control)
        this.onChange(this.values);
    }
}
