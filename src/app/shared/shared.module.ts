/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FileSizePipe } from './pipe/filesize.pipe';
import { FormatDatePipe } from './pipe/format.date.pipe';
import { ArrayFilterPipe } from './pipe/array.filter.pipe';
import { RangeValidatorDirective } from './directive/range.validator.directive';
import { PhoneNumberValidatorDirective } from './directive/phone.validator.directive';
import { URLValidatorDirective } from './directive/url.validator.directive';

export { isPresent, isDate } from './utils/lang';
export { StringUtils } from './utils/string.utils';
export { FileUtils } from './utils/file.utils';

/**
 * @name SharedModule
 * @description
 * SharedModule is an NgModule that provides SHARED Components, Directive and Pipes.
 * <ul>
 *     <li>它导入了CommonModule，这是因为它的组件需要这些公共指令；</li>
 *     <li>正如我们所期待的，它声明并导出了工具性的管道、指令和组件类；</li>
 *     <li>它重新导出了CommonModule和FormsModule。通过让SharedModule重新导出CommonModule和FormsModule模块，我们可以消除其它组件的模块重复导入。</li>
 * </ul>
 * {@link https://angular.cn/docs/ts/latest/guide/ngmodule.html#!#shared-module}
 *
 * @author fbchen 2017-03-08
 */
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        RangeValidatorDirective,
        PhoneNumberValidatorDirective,
        URLValidatorDirective,
        FileSizePipe, FormatDatePipe, ArrayFilterPipe
    ],
    exports: [
        CommonModule, FormsModule,
        RangeValidatorDirective,
        PhoneNumberValidatorDirective,
        URLValidatorDirective,
        FileSizePipe, FormatDatePipe, ArrayFilterPipe
    ],
    entryComponents: [

    ]
})
export class SharedModule { }
