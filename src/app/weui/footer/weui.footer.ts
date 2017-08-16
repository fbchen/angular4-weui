/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, HostBinding, Renderer2, ElementRef } from '@angular/core';
import { Directive, Host, Optional } from '@angular/core';

/**
 * 页脚
 */
@Component({
    selector: 'weui-footer',
    template: '<ng-content></ng-content>'
})
export class WeUIFooter {

    /**
     * 固定在底部
     */
    @Input() fixedAtBottom = false;

    /**
     * 基本样式
     */
    @HostBinding('class') cls = 'weui-footer';

    /**
     * 固定在底部样式
     */
    @HostBinding('class.weui-footer_fixed-bottom') get fixedBottomCls(): boolean {
        return this.fixedAtBottom;
    }

    constructor() {

    }

}

@Directive({
    selector: 'weui-footer-text,[weui-footer-text]'
})
export class WeUIFooterText {

    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        @Optional() @Host() private _container: WeUIFooter) {
        if (_container !== null) {
            _renderer.addClass(_elementRef.nativeElement, 'weui-footer__text');
        }
    }

}

@Directive({
    selector: 'weui-footer-links,[weui-footer-links]'
})
export class WeUIFooterLinks {

    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        @Optional() @Host() private _container: WeUIFooter) {
        if (_container !== null) {
            _renderer.addClass(_elementRef.nativeElement, 'weui-footer__links');
        }
    }

}

@Directive({
    selector: 'a'
})
export class WeUIFooterLink {

    constructor(
        private _renderer: Renderer2,
        private _elementRef: ElementRef,
        @Optional() @Host() private _container: WeUIFooterLinks) {
        if (_container !== null) {
            _renderer.addClass(_elementRef.nativeElement, 'weui-footer__link');
        }
    }

}
