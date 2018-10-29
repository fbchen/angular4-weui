/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { WeUIPicker, PickerOption } from './weui.picker';
import { WeUIPickerGroup } from './weui-picker-group';
import { Schedule, parse as parseCron, parseField } from './cron';

/**
 * 求下一轮的数值
 *
 * @param expr cron 表达式
 * @param year 年份
 * @param month 月份，取值范围为：1-12
 */
function nexts(expr: string, year?: number, month?: number): PickerOption[] {
    const result: PickerOption[] = [];
    const atoms: string[] = expr.replace(/^\s\s*|\s\s*$/g, '').split(/\s+/);

    // (1) 根据“年” 求可用的“月”
    if (!month) {
        const months: number[] = parseField(atoms[1], [1, 12]);
        for (let m = 1; m <= 12; m++) {
            result.push({
                label: m + '月',
                value: m,
                disabled: months.indexOf(m) === -1
            });
        }
        return result;
    }

    // (2) 根据“年、月” 求可用的“日”
    const today = new Date();
    const _year = year || today.getFullYear();
    const maxDate = getActualMaximumDate(_year, month);
    const startDt = new Date(_year, month - 1, 1);
    const endDt = new Date(_year, month - 1, maxDate);
    const interval: Schedule = parseCron(expr, startDt, endDt);

    const available: number[] = [];
    let obj: { value: Date, done: boolean };
    do {
        obj = interval.next();
        available.push(obj.value.getDate());
    } while (!obj.done);

    for (let i = 1; i <= maxDate; i++) {
        result.push({
            label: i + '日',
            value: i,
            disabled: available.indexOf(i) === -1
        });
    }
    return result;
}

/**
 * 根据年、月求当月的最大日期
 *
 * @param year 年份
 * @param month 月份，取值：1-12（1月-12月）
 */
function getActualMaximumDate(year: number, month: number): number {
    const calendar = new Date(year, month - 1, 31);
    while (calendar.getMonth() !== month - 1) {
        calendar.setDate(calendar.getDate() - 1);
    }
    return calendar.getDate();
}


/**
 * 日期选择器
 */
@Component({
    selector: 'weui-date-picker',
    template: `
        <div class="weui-mask" (click)="onCancel()"
            [ngClass]="{'weui-animate-fade-in': shown, 'weui-animate-fade-out': !shown}"></div>
        <div class="weui-picker"
            [ngClass]="{'weui-animate-slide-up': shown, 'weui-animate-slide-down': !shown}"
            (animationend)="onAnimationEnd($event)">
            <div class="weui-picker__hd">
                <a href="javascript:;" class="weui-picker__action" (click)="onCancel()">{{cancelText}}  </a>
                <a href="javascript:;" class="weui-picker__action" (click)="onConfirm()">{{confirmText}}</a>
            </div>
            <div class="weui-picker__bd">
                <weui-picker-group tappable #yearPicker
                    class="weui-picker__group" [options]="years" (change)="onChangeYear($event)">
                </weui-picker-group>
                <weui-picker-group tappable #monthPicker
                    class="weui-picker__group" [options]="months" (change)="onChangeMonth($event)">
                </weui-picker-group>
                <weui-picker-group tappable #datePicker
                    class="weui-picker__group" [options]="dates" (change)="onChangeDate($event)">
                </weui-picker-group>
            </div>
        </div>
    `,
    exportAs: 'weuiDatePicker'
})
export class WeUIDatePicker extends WeUIPicker implements OnInit, AfterViewInit {

    /**
     * cron 表达式，三位，分别是 dayOfMonth[1-31]，month[1-12] 和 dayOfWeek[0-6]（周日-周六）。<br>
     * 格式: 日期 月份 周。例如：* * * 或 1,2,5-9 1-6 0-6 或 1/2 * * 等。默认：* * *。
     */
    @Input() cron = '* * *';

    /**
     * 开始日期/年份。取值：<ul>
     * <li>(1)字符串：符合ISO 8601日期格式的字符串，如：2013-01-18 或者 20130118；</li>
     * <li>(2)数值：表示年份，如：2011，则默认加"-01-01"在年份之后 </li>
     * <li>(3)Date：JavaScript Date对象 </li>
     * </ul>
     */
    @Input() set start(start: any) {
        this._startDate = this._parseDate(start, '-01-01');
    }
    private _startDate: Date; // 开始日期

    /**
     * 结束日期/年份。取值：<ul>
     * <li>(1)字符串：符合ISO 8601日期格式的字符串，如：2013-01-18 或者 20130118；</li>
     * <li>(2)数值：表示年份，如：2011，则默认加"-12-31"在年份之后 </li>
     * <li>(3)Date：JavaScript Date对象 </li>
     * </ul>
     */
    @Input() set end(end: any) {
        this._endDate = this._parseDate(end, '-12-31');
    }
    private _endDate: Date; // 结束日期


    /** 年月日 显示列表 */
    @ViewChild('yearPicker') yearPicker: WeUIPickerGroup;
    @ViewChild('monthPicker') monthPicker: WeUIPickerGroup;
    @ViewChild('datePicker') datePicker: WeUIPickerGroup;


    public years: PickerOption[] = [];
    public months: PickerOption[] = [];
    public dates: PickerOption[] = [];

    private _parseDate(value: any, sub: string): Date {
        if (typeof value === 'string') {
            let v = value;
            if (v.length === 4) {
                v = v + sub;
            }
            if (/^(\d{4})-(\d{2})-(\d{2})$/.test(v) || /^(\d{4})(\d{2})(\d{2})$/.test(v)) {
                return new Date(+RegExp.$1, +RegExp.$2 - 1, +RegExp.$3);
            }
        }
        if (typeof value === 'number') {
            return new Date(value + sub);
        }
        return value; // 默认为Date对象
    }

    constructor() {
        super();
    }

    ngOnInit(): void {
        // 设置初始值
        const now = new Date();
        const thisYear = now.getFullYear();
        if (!this._startDate) {
            this.start = thisYear - 10;
        }
        if (!this._endDate) {
            this.end = thisYear + 10;
        }
        if (this._startDate.getTime() > this._endDate.getTime()) {
            [this._startDate, this._endDate] = [this._endDate, this._startDate];
        }

        // 年份列表
        const endYear = this._endDate.getFullYear();
        for (let year = this._startDate.getFullYear(); year <= endYear; year++) {
            this.years.push({
                label: year + '年',
                value: year
            });
        }
    }

    ngAfterViewInit(): void {
        // 更新月份、日期列表
        this.updateMonthPickerList();
    }

    /**
     * 选择年或月，触发子列表的变更
     *
     * @param year 被选择的选项
     */
    onChangeYear(year: PickerOption): void {
        if (!year) {
            return; // 未选择任何值，不触发子列表的变更
        }
        super.onChange(year, 0);

        // 变更“年份”时，修改月份列表；如果月份的值为2月，则也修改日期列表
        this.updateMonthPickerList();
    }

    onChangeMonth(month: PickerOption): void {
        super.onChange(month, 1);
        // 变更“月份”时，修改日期列表
        this.updateDatePickerList();
    }

    onChangeDate(date: PickerOption): void {
        super.onChange(date, 2);
    }

    private updateMonthPickerList(): void {
        if (!this.monthPicker) {
            return;
        }
        if (!this.value || !this.value.length || !this.value[0]) {
            return;
        }

        const year: number = this.value[0].value;
        const months = nexts(this.cron, year);

        const options = this.monthPicker.options;
        if (months.length !== options.length) {
            this.monthPicker.options = months;
            this.monthPicker.forceChange();
        }

        // 强制日期列表更新
        this.updateDatePickerList();
    }

    private updateDatePickerList(): void {
        if (!this.datePicker) {
            return;
        }

        const year: number = this.value[0].value;
        const month: number = this.value[1].value;
        const dates = nexts(this.cron, year, month);

        this.value[2] = null; // 清空值
        this.datePicker.options = dates;
        this.datePicker.forceChange();
    }

}

