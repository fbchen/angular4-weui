/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {
    Component, Input, Output, EventEmitter, ElementRef, Renderer2,
    AfterViewInit, ContentChildren, QueryList, OnInit
} from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';

import { WeUITabBarItem } from './weui.tabbar.item';

@Component({
    selector: 'weui-tabbar',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `<ng-content></ng-content>`
})
export class WeUITabBar implements OnInit, AfterViewInit {

    /**
     * 初始激活的子对象
     */
    @Input() activeIndex = 0;

    /** 内部子对象 */
    @ContentChildren(WeUITabBarItem) items: QueryList<WeUITabBarItem>;

    /**
     * 激活事件
     */
    @Output() activated = new EventEmitter<WeUITabBarItem>();

    private _activated: any;

    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService) {

    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-tabbar`]: true
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.activateAt(this.activeIndex);
        }, 1);
    }

    getAt(index: number): WeUITabBarItem {
        return this.items.find((item: WeUITabBarItem, i: number) => i === index) as WeUITabBarItem;
    }

    activate(item: any): void {
        this._activated = item;
        this.items.forEach(child => {
            child.activate(child === item);
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

