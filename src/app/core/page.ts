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

}
