/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WeUIFile } from '../uploader/weui.uploader';

@Component({
    selector: 'weui-gallery',
    template: `
        <div class="weui-gallery weui-transition-opacity" [ngClass]="{'weui-block': _show, 'weui-fadeIn': shown}">
            <span class="weui-gallery__img" [style.background-image]="image?.fileURL"></span>
            <div class="weui-gallery__opr" *ngIf="canDelete">
                <a href="javascript:;" class="weui-gallery__del" (click)="deleteImage($event)">
                    <i class="weui-icon-delete weui-icon_gallery-delete"></i>
                </a>
            </div>
        </div>
    `
})
export class WeUIGallery {

    /**
     * 背景图片，如：url(./images/pic_160.png)
     */
    @Input() image: WeUIFile;

    /**
     * 是否显示删除按钮
     */
    @Input() canDelete = true;

    /**
     * 删除事件
     */
    @Output() delete = new EventEmitter<WeUIFile>();

    /**
     * 已显示否
     */
    public shown = false; // (显示时，先_show，然后才shown)
    public _show = false; // 解决transition动画与display冲突的问题

    constructor() {

    }

    /**
     * @internal
     */
    deleteImage(event: Event): void {
        this.delete.emit(this.image);
        event.preventDefault();
    }

    /**
     * 显示图片
     */
    show(): void {
        this._show = true;
        setTimeout(() => { // 解决transition动画与display冲突的问题
            this.shown = true;
        }, 10);
    }

    /**
     * 隐藏图片
     */
    hide(): void {
        this.shown = false;
        setTimeout(() => {
            this._show = false;
        }, 200);
    }

}
