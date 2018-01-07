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


export function isEmptyArray(arr: any): boolean {
    if (Array.isArray(arr)) {
        return arr.length === 0 || arr.every(i => !i);
    }
    return false;
}

export function arrayEquals(array1: any[], array2: any[]): boolean {
    if (!array1 || !array2 || array1.length !== array2.length) {
        return false;
    }

    const len = array1.length;
    for (let i = 0; i < len; i++) {
        if (array1[i] !== array2[i]) {
            return false;
        }
    }
    return true;
}
