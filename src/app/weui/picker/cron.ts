/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */


/**
 * 支持的格式：(1) 纯数字；(2)范围: min-max；(3)叠加：mum/step
 */
const regex = /^(\d+)(?:-(\d+))?(?:\/(\d+))?$/g;

/**
 * 日[1-31]、月[1-12]、周[0-6]（周日-周六）的取值范围
 */
const constraints = [[1, 31], [1, 12], [0, 6]];

/**
 * Schedule
 */
export class Schedule {

    /**
     * days of the month
     */
    private _dates: number[];

    /**
     * months
     */
    private _months: number[];

    /**
     * days of the week
     */
    private _days: number[];

    /**
     * current cursor
     */
    private _pointer: Date;


    /**
     * 构造
     * @param fields [[日..], [月..], [周..]]
     * @param _start 起始日期
     * @param _end   终止日期
     */
    constructor(private fields: number[][], private _start: Date, private _end: Date) {
        /**
         * dayOfMonth
         * @type {Array}
         */
        this._dates = fields[0];

        /**
         * month
         * @type {Array}
         */
        this._months = fields[1];

        /**
         * dayOfWeek
         * @type {Array}
         */
        this._days = fields[2];

        /**
         * cursor
         * @type {Date}
         * @private
         */
        this._pointer = _start;
    }

    _findNext(): Date {
        let next: Date;
        while (true) {
            if (this._end.getTime() - this._pointer.getTime() < 0) {
                throw new Error(`out of range, end is ${this._end}, current is ${this._pointer}`);
            }

            const month: number = this._pointer.getMonth();
            const date: number = this._pointer.getDate();
            const day: number = this._pointer.getDay();

            if (this._months.indexOf(month + 1) === -1) {
                this._pointer.setMonth(month + 1);
                this._pointer.setDate(1);
                continue;
            }

            if (this._dates.indexOf(date) === -1) {
                this._pointer.setDate(date + 1);
                continue;
            }

            if (this._days.indexOf(day) === -1) {
                this._pointer.setDate(date + 1);
                continue;
            }

            next = new Date(this._pointer);

            break;
        }
        return next;
    }

    /**
     * fetch next data
     */
    next(): {value: Date, done: boolean} {
        const value: Date = this._findNext();
        // move next date
        this._pointer.setDate(this._pointer.getDate() + 1);
        return {
            value: value,
            done: !this.hasNext()
        };
    }

    /**
     * has next
     * @returns {boolean}
     */
    hasNext(): boolean {
        try {
            this._findNext();
            return true;
        } catch (e) {
            return false;
        }
    }
}

/**
 * 解析表达式，并获得合法的数字的列表，如合法的月份数
 *
 * @param field 日期cron表达式中通过空格分割后的某一部分(日、月、周)的内容
 * @param _constraints 取值约束，如日期为[1,31]
 * @returns number[]
 */
export function parseField(field: string, _constraints: number[]): number[] {
    const low: number = _constraints[0];
    const high: number = _constraints[1];
    const result: number[] = [];

    // * 号等于最低到最高
    field = field.replace(/\*/g, low + '-' + high);

    // 处理 1,2,5-9 这种情况
    const fields: string[] = field.split(',');
    const len = fields.length;
    for (let i = 0; i < len; i++) {
        const f: string = fields[i];
        if (f.match(regex)) {
            f.replace(regex, ($0: string, _lower: string, _upper: string, _step: string): string => {
                // ref to `cron-parser`
                const step: number = parseInt(_step, 10) || 1;
                // Positive integer higher than constraints[0]
                const lower: number = Math.min(Math.max(low, Math.abs(+_lower)), high);

                // Positive integer lower than constraints[1]
                const upper: number = _upper ? Math.min(high, Math.abs(+_upper)) : high;

                // Count from the lower barrier to the upper
                let pointer: number = lower;

                do {
                    result.push(pointer);
                    pointer += step;
                } while (pointer <= upper);
                return null;
            });
        }
    }
    return result;
}

/**
 * 解析表达式，并返回Schedule对象
 *
 * @param expr  cron表达式，形如: 日期 月份 周。例如：* * * 或 1,2,5-9 1-6 0-6 或 1/2 * * 等
 * @param start 开始日期
 * @param end   介绍日期
 * @returns {*}
 */
export function parse(expr: string, start: Date, end: Date): Schedule {
    const atoms: string[] = expr.replace(/^\s\s*|\s\s*$/g, '').split(/\s+/);
    const fields: number[][] = [];
    atoms.forEach((atom: string, index: number) => {
        const constraint: number[] = constraints[index];
        fields.push(parseField(atom, constraint));
    });
    return new Schedule(fields, start, end);
}
