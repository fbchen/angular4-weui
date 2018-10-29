/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, HostListener, AfterViewInit } from '@angular/core';
import { PickerOption } from './weui.picker';

/**
 * 获取Window窗口的高度
 */
const getWindowHeight = (): number => {
    return window.innerHeight;
};

@Component({
    selector: 'weui-picker-group',
    preserveWhitespaces: false,
    template: `
        <div class="weui-picker__mask"></div>
        <div class="weui-picker__indicator"></div>
        <div class="weui-picker__content" [ngStyle]="{
                '-webkit-transform': translate3d, 'transform': translate3d,
                '-webkit-transition': transition, 'transition': transition
            }">
            <div class="weui-picker__item" *ngFor="let option of options"
                [ngClass]="{'weui-picker__item_disabled': option.disabled}">{{option.label}}</div>
        </div>
    `
})
export class WeUIPickerGroup implements AfterViewInit {

    /**
     * 默认参数
     */
    defaults: any = {
        offset: 3,           // 列表初始化时的偏移量（列表初始化时，选项是聚焦在中间的，通过offset强制往上挪3项，以达到初始选项是为顶部的那项）
        rowHeight: 34,       // 列表每一行的高度
        bodyHeight: 7 * 34,  // picker的高度，用于辅助点击滚动的计算
        inertiaTime: 150,    // 惯性滑动的保持时间，此值直接影响“灵敏度” (单位：ms)
        slideDuration: 300   // 惯性滑动的动画时间，表现为最终可视化的效果
    };

    /**
     * 当前列表组的选项
     */
    @Input() options: PickerOption[] = [];

    /**
     * 初始值
     */
    @Input() value: any;

    /**
     * 修改事件
     */
    @Output() change = new EventEmitter<any>();

    private startTime: number; // 开始触摸的时间
    private startY: number | null;    // 保存开始按下的位置 (touchstart)
    private endY: number;      // 保存结束时的位置 (touchend)
    private speed: number;     // 手滑动的速度 (用途：速度乘以惯性滑动的时间, 例如 300ms, 计算出应该滑动的距离)

    /**
     * 选项滚动的距离，用于设置translate3d的Y值
     */
    private distance = 0;

    public get translate3d(): string {
        return `translate3d(0, ${this.distance}px, 0)`;
    }

    /**
     * 选项惯性滚动的时间
     */
    private duration = 0; // ms
    public get transition(): string {
        return `all ${this.duration}ms`;
    }

    constructor() {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.init();
        }, 1);
    }

    forceChange(): void {
        this.init();
    }

    @HostListener('touchstart', ['$event'])
    _start(event: TouchEvent): void {
        this.startY = event.changedTouches[0].pageY;
        this.startTime = +new Date();
    }

    @HostListener('touchmove', ['$event'])
    _move(event: TouchEvent): void {
        const endTime = +new Date();
        this.endY = event.changedTouches[0].pageY;

        // 计算滑动的速度: 距离 / 时间
        const _distance: number = this.endY - (this.startY || 0);
        this.speed = _distance / (endTime - this.startTime);

        // 重新设置开始时间、开始位置
        this.startTime = endTime;
        this.startY = this.endY;
        this.duration = 0;          // ms
        this.distance += _distance; // 内容移动的距离
        // console.log(`速度=${this.speed} px/ms`);

        event.preventDefault();
    }

    @HostListener('touchend', ['$event'])
    _end(event: TouchEvent): void {
        if (!this.startY) {
            return;
        }
        this.endY = event.changedTouches[0].pageY;

        /**
         * 思路:
         * 根据最后一次touchmove事件的速度(speed)，判断是否执行惯性滑动；
         * 如果speed大于1、小于5，则根据速度乘以惯性滑动的时间(如150ms)，计算出应该滑动的距离；
         * 如果speed大于5，则按照屏幕的高度(减去列表高度的一半)，作为该滑动的距离。
         */
        const _speed = Math.abs(this.speed);
        if (_speed >= 5) {
            const windowY = getWindowHeight() - (this.defaults.bodyHeight / 2);
            this.stop(windowY - this.endY);
        } else if (_speed >= 1) {
            const diff = this.speed * this.defaults.inertiaTime; // 滑行 150ms,这里直接影响“灵敏度”
            this.stop(diff);
        } else {
            this.stop(0);
        }
        this.startY = null;
    }

    init(): void {
        let index = 0;
        if (this.value) { // 有传入value，则按value找可匹配的选项
            const len = this.options && this.options.length || 0;
            for (; index < len; index++) {
                const option = this.options[index];
                if (this.value === option.value || this.value.value === option.value) {
                    this.onChange(option, index);
                    this.distance = (this.defaults.offset - index) * this.defaults.rowHeight;
                    return; // 已找到匹配选项，直接返回
                }
            }
            console.warn('Picker has not match defaultValue:', this.value);
        }

        // 没有传入value，或者 有value但是没有匹配的选项
        index = this._getDefaultIndex(this.options);
        this.onChange(this.options[index], index);
        this.distance = this._getDefaultTranslate(this.defaults.offset, this.defaults.rowHeight, this.options);
    }

    /**
     * 当touch事件结束时，根据惯性滑动计算当前在哪个选项，以及列表滚动的最终距离
     *
     * @param diff 惯性滑动的距离
     */
    stop(diff: number): void {
        let dist = this.distance + diff;

        // 移动到最接近的那一行
        dist = Math.round(dist / this.defaults.rowHeight) * this.defaults.rowHeight;
        const max = this._getMax(this.defaults.offset, this.defaults.rowHeight);
        const min = this._getMin(this.defaults.offset, this.defaults.rowHeight, this.options.length);
        // console.log(`移动距离: dist=${dist}px`);

        // 不要超过最大值或者最小值
        dist = Math.max(Math.min(dist, max), min);

        // 如果是 disabled 的就跳过
        let index = this.defaults.offset - dist / this.defaults.rowHeight;
        while (!!this.options[index] && this.options[index].disabled) {
            diff > 0 ? ++index : --index;
        }
        dist = (this.defaults.offset - index) * this.defaults.rowHeight;

        this.duration = this.defaults.slideDuration;  // ms
        this.distance = dist; // px

        // 触发选择事件
        this.onChange(this.options[index], index);
    }

    /**
     * 选择某个选项时触发
     *
     * @param option 选中的选项
     * @param index  该选项在列表中的索引
     */
    onChange(option: PickerOption, index?: number): void {
        this.change.emit(option);
    }


    /**
     * get max translate
     *
     * @param offset
     * @param rowHeight
     * @return number
     */
    _getMax(offset: number, rowHeight: number): number {
        return offset * rowHeight;
    }

    /**
     * get min translate
     *
     * @param offset
     * @param rowHeight
     * @param length
     * @return number
     */
    _getMin(offset: number, rowHeight: number, length: number): number {
        return -(rowHeight * (length - offset - 1));
    }

    /**
     * get index of middle item
     *
     * @param items
     * @return number
     */
    _getDefaultIndex(options: any[]): number {
        let current = Math.floor(options.length / 2);
        let count = 0;
        while (!!options[current] && options[current].disabled) {
            current = ++current % options.length;
            count++;

            if (count > options.length) {
                throw new Error('No selectable item.');
            }
        }

        return current;
    }

    _getDefaultTranslate(offset: number, rowHeight: number, options: any[]): number {
        const currentIndex = this._getDefaultIndex(options);

        return (offset - currentIndex) * rowHeight;
    }

}
