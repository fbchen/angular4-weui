/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

/**
 * 分页设置
 *
 * @author fbchen
 * @version 1.0 2016-11-20
 */
export class Page {

    /**
     * 当前页码，基于1
     */
    pageNo = 1;

    /**
     * 每页最多显示记录数
     */
    pageSize = 10;

    /**
     * 总页数
     */
    pageCount = 0;

    /**
     * 总记录
     */
    totalCount = 0;

    /**
     * 当前页的记录数
     */
    recordCount = 0;

    /**
     * 当前页的开始记录位置，如：1
     */
    recordStart = 1;

    /** 更新内部数据 */
    public update(data: any): void {
        Object.assign(this, data);
    }

    /** 数据显示范围 */
    public range(range: number[], total: number): string {
        const min = Math.min(range[0], this.totalCount);
        const max = Math.min(range[1], this.totalCount);
        return `${min} - ${max}`;
    }

    /** 减少一个记录 */
    public reduce(count = 1): void {
        this.totalCount -= count;
        this.recordCount -= count;
    }

    /** 增加一个记录 */
    public increase(count = 1): void {
        this.totalCount += count;
        this.recordCount += count;
    }

}
