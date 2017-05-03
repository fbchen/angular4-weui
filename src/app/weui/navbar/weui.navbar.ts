/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, HostBinding, AfterViewInit, ContentChildren, QueryList } from '@angular/core';
import { WeUINavBarItem } from './weui.navbar.item';

@Component({
    selector: 'weui-navbar',
    template: `<ng-content></ng-content>`
})
export class WeUINavBar implements AfterViewInit {

    /**
     * 初始激活的子对象
     */
    @Input() activeIndex = 0;

    /**
     * 设置基本样式
     */
    @HostBinding('class.weui-navbar') barCls = true;

    /** @internal */
    @ContentChildren(WeUINavBarItem) items: QueryList<WeUINavBarItem>;

    /**
     * 激活事件
     */
    @Output() activated = new EventEmitter<WeUINavBarItem>();

    private _activated: any;

    constructor() {

    }

    ngAfterViewInit(): void {
        this.activateAt(this.activeIndex);
    }

    getAt(index: number): WeUINavBarItem {
        return this.items.find((item: WeUINavBarItem, i: number): boolean => i === index);
    }

    activate(item: any): void {
        this._activated = item;
        this.items.forEach(child => {
            child.activated(child === item);
        });

        this.activated.emit(item);
    }

    activateAt(index: number): void {
        const item = this.getAt(index);
        if (item) {
            this.activate(item);
        }
    }

    isActivated(item: WeUINavBarItem): boolean {
        return item.isActivated();
    }

}
