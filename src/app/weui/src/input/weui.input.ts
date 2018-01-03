/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, Renderer2, ElementRef, HostBinding, ContentChild } from '@angular/core';
import { OnChanges, SimpleChanges, forwardRef, ViewEncapsulation, Optional, Inject } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { WeUIFormControl } from './weui.form.control';

const WEUI_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WeUIInput),
    multi: true
};

@Component({
    selector: 'weui-input',
    template: `
        <div class="weui-cell__hd">
            {{label}}<ng-content select="label"></ng-content>
        </div>
        <div class="weui-cell__bd">
            <div class="weui-input-area" *ngIf="type !== 'textarea'">
                <input #input class="weui-input" [type]="type"
                    [attr.id]="id" [attr.name]="name" [placeholder]="placeholder"
                    [attr.maxlength]="maxlength" [attr.minlength]="minlength" [pattern]="pattern"
                    [attr.max]="max" [attr.min]="min" [required]="required" [readonly]="readonly"
                    [disabled]="disabled" [autocomplete]="autocomplete ? 'on' : 'off'"
                    [(ngModel)]="innerValue"
                    (blur)="onBlur($event)" (focus)="onFocus($event)"
                    (keydown)="onKeyboardEvent($event)" (keyup)="onKeyboardEvent($event)" />
                <div *ngIf="maxlength && countChars" class="weui-text-counter">
                    <span>{{getCharCount()}}</span>/{{maxlength}}
                </div>
            </div>

            <div class="weui-input-area" *ngIf="type == 'textarea'">
                <textarea #textarea class="weui-textarea"
                    [placeholder]="placeholder" [rows]="rows"
                    [required]="required" [readonly]="readonly"
                    [attr.minlength]="minlength" [attr.maxlength]="maxlength"
                    [(ngModel)]="innerValue"
                    (keydown)="onKeyboardEvent($event)" (keyup)="onKeyboardEvent($event)"></textarea>
                <div *ngIf="maxlength && countChars" class="weui-textarea-counter">
                    <span>{{getCharCount()}}</span>/{{maxlength}}
                </div>
            </div>
        </div>
        <div class="weui-cell__ft">
            <ng-content select="[weui-last]"></ng-content>
            <i class="weui-icon-warn" *ngIf="shouldShowWarnIcon()"></i>
        </div>
    `,
    providers: [WEUI_INPUT_CONTROL_VALUE_ACCESSOR],
    encapsulation: ViewEncapsulation.None
})
export class WeUIInput extends WeUIFormControl implements OnChanges {

    /**
     * 控件类型：text, number, tel, email, password, date, datetime-local等
     */
    @Input() type = 'text';

    /**
     * pattern 属性规定用于验证输入字段的模式（正则表达式）。<br>
     * 注释：pattern 属性适用于以下 <input> 类型：text, search, url, telephone, email 以及 password 。
     */
    @Input() pattern: string;

    /**
     * placeholder 规定帮助用户填写输入字段的提示。<br>
     * 注释：placeholder 属性适用于以下的 <input> 类型：text, search, url, telephone, email 以及 password。
     */
    @Input() placeholder: string;

    /**
     * maxlength 属性规定输入字段的最大长度，以字符个数计。<br>
     * 注释：maxlength 属性与 <input type="text"> 或 <input type="password"> 配合使用。
     */
    @Input() maxlength: string;

    /**
     * minlength 属性规定输入字段的最小长度，以字符个数计。<br>
     * 注释：minlength 属性与 <input type="text"> 或 <input type="password"> 配合使用。
     */
    @Input() minlength: string;

    /**
     * max 属性规定输入字段所允许的最大值。<br>
     * 注释：max 和 min 属性适用于以下 <input> 类型：number, range, date, datetime, datetime-local, month, time 以及 week。
     */
    @Input() max: number | Date;

    /**
     * min 属性规定输入字段所允许的最小值。<br>
     * 注释：max 和 min 属性适用于以下 <input> 类型：number, range, date, datetime, datetime-local, month, time 以及 week。
     */
    @Input() min: number | Date;

    /**
     * 是否必填
     */
    @Input() required = false;

    /**
     * 是否只读
     */
    @Input() readonly = false;

    /**
     * autocomplete 属性规定输入字段是否应该启用自动完成功能。默认为on。<br>
     * 自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。
     */
    @Input() autocomplete = true;

    /**
     * 是否监听输入长度
     */
    @Input() countChars = false;

    /**
     * 样式
     */
    @Input() baseCls: string;

    /**
     * 输入域无效时显示告警图标，默认为true
     */
    @Input() showWarnIcon = true;

    /**
     * 行数，当类型是textarea时
     */
    @Input() rows = 3;

    /**
     * @output {event} Expression to call when the input no longer has focus
     */
    @Output() blur: EventEmitter<Event> = new EventEmitter<Event>();

    /**
     * @output {event} Expression to call when the input has focus
     */
    @Output() focus: EventEmitter<Event> = new EventEmitter<Event>();

    // 实际输入控件(<input>)
    @ContentChild(NgControl) state: NgControl;

    constructor(
        protected renderer: Renderer2,
        protected elementRef: ElementRef,
        @Optional() @Inject(COMPOSITION_BUFFER_MODE) protected compositionMode: boolean) {
        super(renderer, elementRef, compositionMode);
    }

    /**
     * 扩展样式，如：weui-cell_example
     */
    @HostBinding('class.weui-check__label') _cls_check_label = true;

    /**
     * 扩展样式，如：weui-cell_example
     */
    @HostBinding('class.weui-cell_warn') get warnCls(): boolean {
        return this.shouldWarn();
    }

    ngOnChanges(changes: SimpleChanges): void {
        const changed = changes['baseCls'];
        if (changed) {
            const _el = this.elementRef.nativeElement as HTMLElement;
            if (changed.previousValue) {
                _el.classList.remove(`weui-cell_${changed.previousValue}`);
            }
            if (changed.currentValue) {
                _el.classList.add(`weui-cell_${changed.currentValue}`);
            }
        }
    }

    shouldWarn(): boolean {
        return this.state.invalid === true &&
            (this.state.touched === true || this.state.dirty === true);
    }

    shouldShowWarnIcon(): boolean {
        return this.showWarnIcon && this.shouldWarn();
    }

    onBlur(ev: UIEvent) {
        this.onTouched(); // set your control to 'touched'
        this.blur.emit(ev);
    }

    onFocus(ev: UIEvent) {
        this.focus.emit(ev);
    }

    /**
     * 统计字符总长度
     */
    getCharCount(): number {
        return (this._value && this._value.length) || 0;
    }

    /**
     * 当事件keyup、change时，当字数大于等于maxLength后，禁止输入
     */
    onKeyboardEvent(event: KeyboardEvent): void {
        const maxLen = parseInt(this.maxlength, 10);
        if (!isNaN(maxLen) && this.getCharCount() >= maxLen) {
            if (event.keyCode !== 46 && event.keyCode !== 8) {
                event.preventDefault(); // 禁止输入
            }
        }
    }
}
