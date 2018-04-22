/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {
    Component, Input, Output, EventEmitter, Renderer2, ElementRef, ContentChild,
    OnInit, forwardRef, ViewEncapsulation, Optional, Inject, HostBinding
} from '@angular/core';
import { DefaultValueAccessor, NgControl, NgForm, NG_VALUE_ACCESSOR, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { UpdateClassService } from '../core/service/update.class.service';
import { toBoolean } from '../util/lang';


const WEUI_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WeUIInput),
    multi: true
};

@Component({
    selector: 'weui-input',
    preserveWhitespaces: false,
    providers: [ UpdateClassService, WEUI_INPUT_CONTROL_VALUE_ACCESSOR ],
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
                    [(ngModel)]="value"
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
                    [(ngModel)]="value"
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
    encapsulation: ViewEncapsulation.None
})
export class WeUIInput extends DefaultValueAccessor implements OnInit {

    public static count = 0;

    @Input() id: string;

    @Input() name: string;

    /**
     * 控件类型：text, number, tel, email, password, date, datetime-local等
     */
    @Input() type = 'text';

    /**
     * 样式
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
    @Input()
    get required(): boolean {
        return this._required;
    }
    set required(required: boolean) {
        const value = toBoolean(required);
        if (this._required !== value) {
            this._required = value;
            this.updateClassMap();
        }
    }
    private _required = false;

    /**
     * 是否只读
     */
    @Input()
    get readonly(): boolean {
        return this._readonly;
    }
    set readonly(readonly: boolean) {
        const value = toBoolean(readonly);
        if (this._readonly !== value) {
            this._readonly = value;
            this.updateClassMap();
        }
    }
    private _readonly = false;

    /**
     * 是否禁用
     */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(disabled: boolean) {
        const value = toBoolean(disabled);
        if (this._disabled !== value) {
            this._disabled = value;
            this.updateClassMap();
        }
    }
    private _disabled = false;

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
    @ContentChild(NgControl) control: NgControl;

    public get value(): any {
        return this._value;
    }
    public set value(value: any) {
        if (this._value !== value) {
            const v = this.processValue(value);
            this._value = v;
            this.onChange(this._value); // Angular need this
        }
    }
    private _value: any;


    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService,
        @Optional() @Inject(COMPOSITION_BUFFER_MODE) protected compositionMode: boolean,
        @Optional() protected parentForm: NgForm) {
        super(renderer, el, compositionMode);
        this.id = `weui-input-${++WeUIInput.count}`;

        if (parentForm) {
            parentForm.ngSubmit.subscribe(() => {
                this.updateClassMap();
            });
        }
    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-cell`]: 1,
            [`weui-cell_${this.baseCls}`]: this.baseCls,
            // [`weui-cell_warn`]: this.shouldWarn(),
            [`weui-input-disabled`]: this.disabled,
            [`weui-input-readonly`]: this.readonly,
            [`weui-input-required`]: this.required
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    @HostBinding('class.weui-cell_warn') get warnCellCls(): boolean {
        return this.shouldWarn();
    }

    shouldWarn(): boolean {
        return this.control.invalid === true && (
            this.control.touched === true || this.control.dirty === true ||
            (this.parentForm && this.parentForm.submitted));
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
        return (this.value && this.value.length) || 0;
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

    /**
     * 设置禁用状态 (From ControlValueAccessor interface)
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * Write a new value to the element. (From ControlValueAccessor interface)
     */
    writeValue(value: any): void {
        this._value = value;
    }

    /** 对用户输入的值进行预处理，如文本转数字等 */
    processValue(value: any): any {
        if (this.type === 'number') {
            const num = parseFloat(value);
            return isNaN(num) ? null : num;
        }
        return value;
    }
}
