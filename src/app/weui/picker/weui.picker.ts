/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, HostBinding } from '@angular/core';

/**
 * 菜单选项
 */
export class PickerOption {
    /**
     * 显示文本
     */
    label: string;

    /**
     * 取值
     */
    value: any;

    /**
     * 是否已禁用
     */
    disabled?: boolean;

    /**
     * 其它属性
     */
    [key: string]: any;
}

/**
 * 多列选择器
 * 参考了 {@link https://github.com/weui/weui.js/blob/master/src/picker/picker.js}的实现
 */
@Component({
    selector: 'weui-picker',
    template: `
        <div class="weui-mask" (click)="onCancel()"
            [ngClass]="{'weui-animate-fade-in': shown, 'weui-animate-fade-out': !shown}"></div>
        <div class="weui-picker" [ngClass]="{'weui-animate-slide-up': shown, 'weui-animate-slide-down': !shown}" (animationend)="onAnimationEnd($event)">
            <div class="weui-picker__hd">
                <a href="javascript:;" class="weui-picker__action" (click)="onCancel()">{{cancelText}}  </a>
                <a href="javascript:;" class="weui-picker__action" (click)="onConfirm()">{{confirmText}}</a>
            </div>
            <div class="weui-picker__bd">
                <weui-picker-group tappable class="weui-picker__group"
                    *ngFor="let options of menus; let i = index;"
                    [options]="options" [value]="value[i]" (change)="onChange($event, i)"></weui-picker-group>
            </div>
        </div>
    `
})
export class WeUIPicker {

    /**
     * @i18n
     */
    defaults: any = {
        cancelText: '取消',
        confirmText: '确定'
    };

    /**
     * 单列菜单列表，内容任意，其中<code>label</code>用于显示，<code>value</code>表示值，<code>disabled</code>表示不可选择项。
     */
    @Input() set menu(menu: PickerOption[]) {
        if (menu !== undefined && menu !== null && menu.length) {
            this.menus = [menu];
        }
    };

    /**
     * 多列菜单列表，内容任意，其中<code>label</code>用于显示，<code>value</code>表示值，<code>disabled</code>表示不可选择项。<br>
     * 注意：列的个数不宜超过3个。
     */
    @Input() menus: PickerOption[][] = [];

    /**
     * 当前选择的值（每列对应一个值）
     */
    @Input() value: any[] = [];

    /**
     * @i18n 取消
     */
    @Input() cancelText: string = this.defaults.cancelText;

    /**
     * @i18n 确定
     */
    @Input() confirmText: string = this.defaults.confirmText;

    /**
     * 用于控制控件的可视化
     */
    @HostBinding('class.weui-hide') get hideCls(): boolean {
        return this.hidden;
    }

    /**
     * 点击【确定】按钮时，通过Promise.resolve()输出最终值
     * @internal
     */
    private resolve: (value: any[]) => void;

    /**
     * 已显示否
     * @internal
     */
    public shown = false;

    /**
     * 已显示否
     * @internal
     */
    private hidden = true;


    constructor() {

    }

    onAnimationEnd(event: AnimationEvent): void {
        if (event.animationName === 'slideDown') {
            this.hidden = true;
        }
    }

    /**
     * 显示菜单
     */
    show(): Promise<any> {
        this.hidden = false;
        this.shown = true;

        return new Promise<any>((resolve, reject) => {
            this.resolve = resolve;
        });
    }

    /**
     * 隐藏菜单
     */
    hide(): void {
        this.shown = false;
    }

    /**
     * 某列数据修改时触发
     *
     * @param option 该列数据的选择项
     * @param index  该列在组内的索引
     */
    onChange(option: PickerOption, index: number): void {
        if (option) {
            this.value[index] = option;
        }
    }

    /**
     * 点击【确定】按钮时，通过Promise.resolve()输出最终值
     */
    onConfirm(): void {
        this.resolve(this.value);
        this.hide();
    }

    /**
     * 点击【取消】按钮时，关闭Picker
     */
    onCancel(): void {
        this.hide();
    }

}

