/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

export function isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
}

export function isDate(obj: any): boolean {
    return !/Invalid|NaN/.test(new Date(obj).toString());
}

export function isNumeric(value: any): boolean {
  return !isNaN(value - parseFloat(value));
}
