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
    useExisting: forwardRef(() => WeUIRadio),
    multi: true
};

@Component({
    selector: 'weui-radio',
    preserveWhitespaces: false,
    providers: [ UpdateClassService, WEUI_FORM_CONTROL_VALUE_ACCESSOR ],
    template: `
        <label class="weui-check__label" [for]="id" (click)="onTouched()">
            <div class="weui-cell__bd">
                {{label}}<ng-content></ng-content>
            </div>
            <div class="weui-cell__ft">
                <input type="radio" class="weui-check"
                    [attr.id]="id" [value]="value" [disabled]="disabled"
                    [(ngModel)]="checkedValue">
                <span class="weui-icon-checked"></span>
            </div>
        </label>
    `
})
export class WeUIRadio extends DefaultValueAccessor implements OnInit {

    public static count = 0;

    @Input() id: string;

    @Input() name: string;

    @Input() value: any = 'on';

    /**
     * 是否禁用
     */
    @Input() disabled = false;

    /** 是否已选中 */
    public get checkedValue(): string {
        return this._checkedValue;
    }
    public set checkedValue(checkedValue: string) {
        this._checkedValue = checkedValue;
        this.emitValue();
    }
    private _checkedValue: string;


    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService,
        @Optional() @Inject(COMPOSITION_BUFFER_MODE) protected compositionMode: boolean) {
        super(renderer, el, compositionMode);
        this.id = `weui-radio-${++WeUIRadio.count}`;
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
        this._checkedValue = value;
    }

    /** 勾选框的选择状态发生变化时，发射出实际值 */
    emitValue(): void {
        if (this.checkedValue === this.value) {
            // view -> model -> outside world (ie. NgModel on this control)
            this.onChange(this.value);
        }
    }

}
