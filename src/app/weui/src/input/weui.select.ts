/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: 'select[weui-select]'
})
export class WeUISelect {

    constructor(
        public renderer: Renderer2,
        public el: ElementRef) {
        this.updateClasses();
    }

    getHostElement(): HTMLElement {
        return this.el.nativeElement as HTMLElement;
    }

    updateClasses(): void {
        const nativeEl = this.el.nativeElement as HTMLElement;
        this.renderer.addClass(nativeEl, 'weui-select');
    }

}
