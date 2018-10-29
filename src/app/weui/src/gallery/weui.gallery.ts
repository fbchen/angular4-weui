/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, OnInit, HostBinding, HostListener } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { WeUIFile } from '../uploader/weui.uploader';
import { UpdateClassService } from '../core/service/update.class.service';

@Component({
    selector: 'weui-gallery,[weui-gallery]',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `
        <span class="weui-gallery__img" [style.background-image]="image?.fileURL"></span>
        <div class="weui-gallery__opr" *ngIf="canDelete">
            <a href="javascript:;" class="weui-gallery__del" (click)="deleteImage($event)">
                <i class="weui-icon-delete weui-icon_gallery-delete"></i>
            </a>
        </div>
    `,
    animations: [
        trigger('visibility', [
            state('show', style({ opacity: 1 })),
            state('hide', style({ opacity: 0 })),
            transition('hide <=> show', [animate(200)])
        ])
    ]
})
export class WeUIGallery implements OnInit {

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
    public shown = false;

    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService) {

    }

    /**
     * 用于控制动画的触发(trigger)
     */
    @HostBinding('@visibility') get visibility(): string {
        return this.shown ? 'show' : 'hide';
    }

    @HostListener('@visibility.done')
    onVisibleChange(): void {
        if (!this.shown) {
            this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
        }
    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-gallery`]: true,
            [`weui-transition-opacity`]: true
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }


    /** 删除照片 */
    deleteImage(event: Event): void {
        this.delete.emit(this.image);
        event.preventDefault();
    }

    /** 显示图片 */
    show(): void {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
        this.shown = true;
    }

    /** 隐藏图片 */
    hide(): void {
        this.shown = false;
    }

}
