/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * 手机号码验证
 */
export function phoneNumberValidator(): ValidatorFn {
    const mobileRe: RegExp = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|1[78][0-9]{9}$/;
    return (control: AbstractControl): { [key: string]: any } => {
        const value = control.value;
        if (!value) { // 为空时不验证合法性
            return null;
        }
        const valid = mobileRe.test(value);
        return !valid ? { 'phoneNumber': { value } } : null;
    };
}


import { Directive } from '@angular/core';
import { Validator, NG_VALIDATORS } from '@angular/forms';

/**
 * 手机号码验证
 *
 * @author fbchen
 * @version 1.0 2016-12-02
 */
@Directive({
    selector: '[phoneNumber]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PhoneNumberValidatorDirective, multi: true }]
})
export class PhoneNumberValidatorDirective implements Validator {

    private validateAt = phoneNumberValidator();

    /**
     * 验证控件
     */
    validate(control: AbstractControl): { [key: string]: any } {
        return this.validateAt(control);
    }

}
