/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Page } from './page';

/**
 * 操作响应结果
 *
 * @author fbchen
 * @version 1.0 2016-11-20
 */
export class Result {

    /**
     * 操作结果
     */
    success = true;

    /**
     * 错误码
     */
    code?: string | number;

    /**
     * 错误描述
     */
    msg?: string;

    /**
     * 新增或修改对象后返回的ID
     */
    id?: string;

    /**
     * 结果集
     */
    list?: any;

    /**
     * 分页信息
     */
    page?: Page;

    /**
     * 数据
     */
    data?: any;

    /**
     * 其它任意成员
     */
    [propName: string]: any;

    /**
     * 通过静态方法创建
     */
    public static fail(code?: string | number, msg?: string): Result {
        const r = new Result(false);
        r.code = code;
        r.msg = msg;
        return r;
    }

    /**
     * 创建
     */
    public constructor(success = true, code?: string | number, msg?: string) {
        this.success = success;
        this.code = code;
        this.msg = msg;
    }

}
