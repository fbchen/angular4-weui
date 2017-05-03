/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Result } from './result';

/**
 * ResultError：扩展自Error
 *
 * @author fbchen
 * @version 1.0 2016-11-28
 */
export class ResultError extends Error {

    public result: Result;

    constructor(result: Result) {
        super();
        this.result = result;
    }

}
