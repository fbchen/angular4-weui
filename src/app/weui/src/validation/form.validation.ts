/**
 * @license
 * Let'say COFFEE © 2017-2018
 * Copyright 厦门美乐味餐饮管理有限公司 All Rights Reserved.
 */


import { Component, Input, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';

/**
 * 控件与提示信息，例如：<code>
 * {
 *     username: {
 *         required: '用户名不能为空',
 *         maxlength: '请输入小于10位长度的字符',
 *         ......
 *     }
 * }
 * </code>
 */
export interface FieldMessages {
    [key: string]: {
        [key: string]: string
    };
}

@Component({
    selector: 'form-validation',
    template: `
        <div class="error" *ngIf="name && getError(name)">
            {{getError(name)}}
        </div>
        <div class="error" *ngIf="!name && firstError()">
            {{firstError()}}
        </div>
    `
})
export class FormValidation {

    /** 自定义错误消息 */
    @Input() messages: FieldMessages = {};

    /** 控件名称 */
    @Input() name: string;

    /** 验证结果，例如: [{username: '必须填写'}, {password: '输入非法'}] */
    protected formErrors: { name: string, message: string }[] = [];

    protected defaultValidationMessages = {
        required: '该项为必填项',
        email: '请输入有效的电子邮件',
        url: '请输入有效的网址',
        date: '请输入有效的日期',
        dateISO: '请输入有效的日期 (YYYY-MM-DD)',
        number: '请输入正确的数字',
        digits: '只可输入数字',
        alphanumeric: '只可输入字母、数字及下划线',
        maxlength: '最多 {0} 个字符',
        minlength: '最少 {0} 个字符',
        rangelength: '请输入长度为 {0} 至 {1} 之间的字符',
        range: '请输入 {0} 至 {1} 之间的数值',
        max: '请输入不大于 {0} 的数值',
        min: '请输入不小于 {0} 的数值'
    };

    constructor(
        private _element: ElementRef,
        private _form: NgForm) {
        if (_form && _form.ngSubmit) {
            _form.ngSubmit.subscribe(this.onSubmit.bind(this));
        }
    }

    /** Form验证后，自动执行消息提示匹配 */
    onSubmit(): void {
        this.validate();
    }

    /**
     * 验证表单，结果存入formErrors
     *
     * @param fieldMsgs 验证控件的自定义错误消息，可选，默认采用默认错误消息。
     * @return 验证结果: true-success, false-fail
     */
    public validate(): boolean {
        const formErrors = [];
        const form = this._form;
        if (!form) {
            return false;
        }

        for (const field in form.controls) {
            if (form.controls.hasOwnProperty(field)) {
                const control = form.controls[field];
                const errors = control && control.errors || {};

                if (control && control.invalid && (control.dirty || form.submitted)) {
                    const messages = (this.messages && this.messages[field]) || {};
                    if (errors['required']) {
                        formErrors.push({
                            name: field,
                            message: messages['required'] || this.defaultValidationMessages['required']
                        });
                        continue; // 默认先验证必填消息
                    }

                    for (const key in errors) {
                        if (errors.hasOwnProperty(key)) {
                            formErrors.push({
                                name: field,
                                message: messages[key] || this.defaultValidationMessages[key]
                            });
                            continue; // 若一个输入框存在多个验证器，即使存在多个错误消息，也仅取一条错误消息
                        }
                    }
                }
            }
        }
        this.formErrors = formErrors;
        return form.valid === true;
    }


    /** 是否已submitted */
    public get submitted(): boolean {
        return this._form && this._form.submitted;
    }

    /** 是否验证通过 */
    public get valid(): boolean {
        return this._form && this._form.valid === true;
    }

    /** 是否验证不通过 */
    public get invalid(): boolean {
        return this._form && this._form.invalid === true;
    }

    /**
     * 是否存在错误
     */
    public hasError(): boolean {
        return this.formErrors.length > 0;
    }

    /**
     * 当存在多个错误消息时，用此方法获取其中的第一个非空错误显示
     */
    public firstError(): string | null {
        const err = this.formErrors[0];
        return (err && err.message) || null;
    }

    /**
     * 获取控件的一个错误
     *
     * @param name 控件name
     * @return 控件错误消息，或者空(没有错误)
     */
    public getError(name: string): string | null {
        const len = this.formErrors.length;
        for (let i = 0; i < len; i++) {
            const err = this.formErrors[i];
            if (err.hasOwnProperty(name)) {
                return err[name];
            }
        }

        return null;
    }


}
