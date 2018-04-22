/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import {
    Component, Input, Output, EventEmitter, ElementRef, Renderer2,
    OnInit, AfterViewInit, ContentChildren, QueryList
} from '@angular/core';
import { onNextFrame } from '../core/anim.frame';
import { UpdateClassService } from '../core/service/update.class.service';

import { WeUINavBarItem } from './weui.navbar.item';

@Component({
    selector: 'weui-navbar,[weui-navbar]',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `<ng-content></ng-content>`
})
export class WeUINavBar implements OnInit, AfterViewInit {

    /**
     * 初始激活的子对象
     */
    @Input() activeIndex = 0;

    /** 内部子对象 */
    @ContentChildren(WeUINavBarItem) items: QueryList<WeUINavBarItem>;

    /**
     * 激活事件
     */
    @Output() activated = new EventEmitter<WeUINavBarItem>();

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
            [`weui-navbar`]: true
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    ngAfterViewInit(): void {
        onNextFrame(() => {
            this.activateAt(this.activeIndex);
        });
    }

    getAt(index: number): WeUINavBarItem {
        return this.items.find((item: WeUINavBarItem, i: number) => i === index) as WeUINavBarItem;
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

    isActivated(item: WeUINavBarItem): boolean {
        return item.isActivated();
    }

}
