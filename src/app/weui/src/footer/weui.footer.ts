/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Renderer2, ElementRef, Directive, OnInit } from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';
import { toBoolean } from '../util/lang';


/**
 * 页脚
 */
@Component({
    selector: 'weui-footer,[weui-footer]',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: '<ng-content></ng-content>'
})
export class WeUIFooter implements OnInit {

    /**
     * 固定在底部
     */
    @Input()
    get fixedAtBottom(): boolean {
        return this._fixedAtBottom;
    }
    set fixedAtBottom(fixedAtBottom: boolean) {
        const value = toBoolean(fixedAtBottom);
        if (this._fixedAtBottom !== value) {
            this._fixedAtBottom = value;
            this.updateClassMap();
        }
    }
    private _fixedAtBottom = false;


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
            [`weui-footer`]: true,
            [`weui-footer_fixed-bottom`]: this.fixedAtBottom
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: `weui-footer-text, [weui-footer-text]`
})
export class WeUIFooterText {

    constructor(
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        renderer.addClass(elementRef.nativeElement, 'weui-footer__text');
    }

}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: `weui-footer-links, [weui-footer-links]`
})
export class WeUIFooterLinks {

    constructor(
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        renderer.addClass(elementRef.nativeElement, 'weui-footer__links');
    }

}

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: `a[weui-footer-link]`
})
export class WeUIFooterLink {

    constructor(
        protected renderer: Renderer2,
        protected elementRef: ElementRef) {
        renderer.addClass(elementRef.nativeElement, 'weui-footer__link');
    }

}
