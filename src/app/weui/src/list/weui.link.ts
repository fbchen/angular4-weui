/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { UpdateClassService } from '../core/service/update.class.service';
import { toBoolean } from '../util/lang';

@Component({
    selector: 'weui-link',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `
        <a class="weui-cell_access" [href]="_href">
            <div class="weui-cell__hd">
                <ng-content select="[weui-start]"></ng-content>
            </div>
            <div class="weui-cell__bd">
                <ng-content select="[weui-content]"></ng-content>
                <ng-content></ng-content>
            </div>
            <div class="weui-cell__ft">
                <ng-content select="[weui-last]"></ng-content>
            </div>
        </a>
    `
})
export class WeUILink implements OnInit {

    /**
     * 不显示最右边的箭头。默认为false，即：显示箭头。
     */
    @Input()
    get noPushArrow(): boolean {
        return this._noPushArrow;
    }
    set noPushArrow(noPushArrow: boolean) {
        const value = toBoolean(noPushArrow);
        if (this._noPushArrow !== value) {
            this._noPushArrow = value;
            this.updateClassMap();
        }
    }
    private _noPushArrow = false;

    /**
     * 样式
     */
    @Input()
    get baseCls(): string {
        return this._baseCls;
    }
    set baseCls(baseCls: string) {
        if (this._baseCls !== baseCls) {
            this._baseCls = baseCls;
            this.updateClassMap();
        }
    }
    private _baseCls: string;

    /**
     * 链接
     */
    @Input() set href(href: string | SafeUrl) {
        if (typeof href === 'string') {
            this._href = this.sanitizer.bypassSecurityTrustUrl(href);
        } else {
            this._href = href;
        }
    }
    public _href: SafeUrl = this.sanitizer.bypassSecurityTrustUrl('javascript:;');

    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService,
        private sanitizer: DomSanitizer) {

    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-cell`]: true,
            [`weui-item`]: true,
            [`weui-cell_access`]: true,
            [`weui-cell_access-noarrow`]: this.noPushArrow,
            [`weui-cell_${this.baseCls}`]: this.baseCls
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

}
