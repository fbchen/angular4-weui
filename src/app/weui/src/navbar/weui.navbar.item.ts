/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Host, Input, ElementRef, Renderer2, HostListener, Optional, Inject, forwardRef, OnInit } from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';

import { WeUINavBar } from './weui.navbar';

@Component({
    // tslint:disable-next-line:directive-selector
    selector: 'weui-navbar-item,[weui-navbar-item]',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `<ng-content></ng-content>`
})
export class WeUINavBarItem implements OnInit {

    /**
     * 任意值，当激活时传递给父级控件
     */
    @Input() value: any;

    // 用于设置激活样式
    public get activated(): boolean {
        return this._activated;
    }
    public set activated(activated: boolean) {
        this._activated = activated;
        this.updateClassMap();
    }
    private _activated = false;

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

    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService,
        @Optional() @Host() @Inject(forwardRef(() => WeUINavBar)) private navbar: WeUINavBar) {

    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-navbar__item`]: true,
            [`weui-bar__item_on`]: this.activated
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    /**
     * 由父级控件传入
     *
     * @param activated 激活状态
     */
    activate(activated: boolean): void {
        this.activated = activated;
    }

    isActivated(): boolean {
        return this.activated;
    }

}
