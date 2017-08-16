/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, HostBinding, AfterViewInit, ContentChildren, QueryList } from '@angular/core';

import { WeUITabBarItem } from './weui.tabbar.item';

@Component({
    selector: 'weui-tabbar',
    template: `<ng-content></ng-content>`
})
export class WeUITabBar implements AfterViewInit {

    /**
     * 初始激活的子对象
     */
    @Input() activeIndex = 0;

    /**
     * 设置基本样式
     */
    @HostBinding('class.weui-tabbar') barCls = true;

    /** @internal */
    @ContentChildren(WeUITabBarItem) items: QueryList<WeUITabBarItem>;

    /**
     * 激活事件
     */
    @Output() activated = new EventEmitter<WeUITabBarItem>();

    private _activated: any;

    constructor() {

    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.activateAt(this.activeIndex);
        }, 1);
    }

    getAt(index: number): WeUITabBarItem {
        return this.items.find((item: WeUITabBarItem, i: number): boolean => i === index);
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

    isActivated(item: WeUITabBarItem): boolean {
        return item.isActivated();
    }

}

