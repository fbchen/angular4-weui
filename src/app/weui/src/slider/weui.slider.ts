/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Renderer2, ElementRef, ViewChild, forwardRef, Optional, Inject, OnInit } from '@angular/core';
import { DefaultValueAccessor, NG_VALUE_ACCESSOR, COMPOSITION_BUFFER_MODE } from '@angular/forms';
import { UpdateClassService } from '../core/service/update.class.service';
import { toBoolean } from '../util/lang';


const WEUI_FORM_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => WeUISlider),
    multi: true
};

@Component({
    selector: 'weui-slider',
    preserveWhitespaces: false,
    providers: [ UpdateClassService, WEUI_FORM_CONTROL_VALUE_ACCESSOR ],
    template: `
        <ng-content select="[weui-start]"></ng-content>
        <div class="weui-slider">
            <div #sliderInner class="weui-slider__inner">
                <div [style.width]="percent + '%'" class="weui-slider__track"></div>
                <div [style.left]="percent + '%'" class="weui-slider__handler"
                    (touchstart)="onTouchStart($event)" (touchmove)="onTouchMove($event)"></div>
            </div>
        </div>
        <ng-content select="[weui-last]"></ng-content>
        <div class="weui-slider-box__value" *ngIf="showValue">{{value}}</div>
    `
})
export class WeUISlider extends DefaultValueAccessor implements OnInit {

    /**
     * 颜色，取值：default、primary、warn等。默认为default。<br>
     * 自定义的颜色名称与色值，可以定义在 工程根目录/src/theme/variables.scss 文件中的 $colors 对象。
     */
    @Input()
    get color(): string {
        return this._color;
    }
    set color(color: string) {
        if (this._color !== color) {
            this._color = color;
            this.updateClassMap();
        }
    }
    private _color = 'default';

    /**
     * 显示值（在最后）
     */
    @Input()
    get showValue(): boolean {
        return this._showValue;
    }
    set showValue(showValue: boolean) {
        const value = toBoolean(showValue);
        if (this._showValue !== value) {
            this._showValue = value;
            this.updateClassMap();
        }
    }
    private _showValue = true;

    /**
     * 禁用样式
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
     * 最小值
     */
    @Input() min = 0;

    /**
     * 最大值
     */
    @Input() max = 100;

    // 内部组件
    @ViewChild('sliderInner') sliderInner: ElementRef;


    /** 取值 */
    public value = 0;

    /** 滑动比例（取值：0-100） */
    public percent = 0;

    private totalLen: number; // 滑条总长度
    private start: number; // 起始位置
    private startX: number; // 鼠标起始点

    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService,
        @Optional() @Inject(COMPOSITION_BUFFER_MODE) protected compositionMode: boolean) {
        super(renderer, el, compositionMode);
    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-slider-box`]: true,
            [`weui-slider-disabled`]: this.disabled,
            [`weui-slider-show-value`]: this.showValue,
            [`weui-slider_${this.color}`]: this.color
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    onTouchStart(event: TouchEvent): void {
        if (this.disabled) {
            return;
        }

        this.totalLen = this.sliderInner.nativeElement.clientWidth;
        this.start = this.percent * this.totalLen / 100;
        this.startX = event.targetTouches[0].clientX;
        this.onTouched();
    }

    onTouchMove(event: TouchEvent): void {
        if (this.disabled) {
            return;
        }

        const dist = event.targetTouches[0].clientX - this.startX;
        let end = this.start + dist;
        end = end < 0 ? 0 : end > this.totalLen ? this.totalLen : end;
        this.percent = end * 100 / this.totalLen;
        this.value = Math.round(this.min + (this.max - this.min) * this.percent / 100);

        event.preventDefault();
        this.onChange(this.value);
    }

    /**
     * Write a new value to the element. (From ControlValueAccessor interface)
     */
    writeValue(value: number = 0): void {
        const v = Math.min(Math.max(value, this.min), this.max);
        this.value = v;
        this.percent = (v + this.min) * 100 / this.max;
    }

    /**
     * 设置禁用状态 (From ControlValueAccessor interface)
     */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}
