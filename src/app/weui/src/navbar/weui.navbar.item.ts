/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Directive, Host, Input, HostBinding, HostListener, Optional } from '@angular/core';
import { Inject, forwardRef } from '@angular/core';

import { WeUINavBar } from './weui.navbar';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'weui-navbar-item,[weui-navbar-item]'
})
export class WeUINavBarItem {

    /**
     * 任意值，当激活时传递给父级控件
     */
    @Input() value: any;

    /**
     * 设置基本样式
     */
    @HostBinding('class.weui-navbar__item') barItemCls = true;

    /**
     * 设置激活样式
     */
    @HostBinding('class.weui-bar__item_on') get activatedCls(): boolean {
        return this._activated;
    }

    private _activated = false; // 用于设置激活样式

    /**
     * 点击触发激活
     *
     * @param event 点击事件
     */
    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        if (this.navbar) {
            this.navbar.activate(this);
        }
    }

    constructor( @Optional() @Host() @Inject(forwardRef(() => WeUINavBar)) private navbar: WeUINavBar) {

    }

    /**
     * 由父级控件传入
     *
     * @param activated 激活状态
     */
    activated(activated: boolean): void {
        this._activated = activated;
    }

    isActivated(): boolean {
        return this._activated;
    }

}
