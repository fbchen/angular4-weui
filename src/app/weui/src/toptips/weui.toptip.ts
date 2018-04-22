/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, HostBinding, OnInit } from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';


/**
 * TopTips - 顶部提示
 */
@Component({
    selector: 'weui-toptips',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `{{content}}`
})
export class WeUITopTips implements OnInit {

    /**
     * 内容
     */
    @Input() content: string;

    /**
     * 隐藏对象
     */
    @Output() close = new EventEmitter<any>();

    /**
     * 样式控制
     */
    @HostBinding('style.display')
    get display(): string {
        return this.shown ? 'block' : 'none';
    }

    /** 已显示否 */
    private shown = false;

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
            [`weui-toptips`]: true,
            [`weui-toptips_warn`]: true
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    /**
     * 显示
     */
    show(): void {
        this.shown = true;
        setTimeout(() => { this.hide(); }, 2000);
    }

    /**
     * 隐藏
     */
    hide(): void {
        this.shown = false;
        this.close.emit();
    }

}
