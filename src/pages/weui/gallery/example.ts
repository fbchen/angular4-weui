/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AbstractPage } from '../abstract-page';
import { WeUIGallery } from '../../../app/weui/gallery/weui.gallery';


@Component({
    templateUrl: 'example.html'
})
export class GalleryExamplePage extends AbstractPage implements OnInit {

    /**
     * 图片预览控件
     */
    @ViewChild(WeUIGallery) gallery: WeUIGallery;

    public image: any = {
        fileURL: 'url(pages/images/zhenhuan.jpg)'
    };

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
        super(element, router, route);
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => {
            this.gallery.show();
        }, 600);
    }

    /**
     * 删除文件
     * @param {file} 需要从列表中删除的图片
     */
    onDelete(file: any): void {
        alert('Your File has been DELETED!');
    }

    show(): void {
        this.gallery.show();
    }

    hide(): void {
        this.gallery.hide();
    }

}
