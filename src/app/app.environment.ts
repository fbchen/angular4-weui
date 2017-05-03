/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Injectable } from '@angular/core';

/**
 * App环境变量
 */
@Injectable()
export class AppEnvironment {

    /**
     * 获取系统版本
     */
    public get version(): string {
        return '1.0.0';
    }

    /**
     * 获取数据服务器URL路径
     */
    public get BaseUrl(): string {
        return 'http://127.0.0.1:9999/';
    }

}
