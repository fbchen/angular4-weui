/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Renderer2, ElementRef, ViewChild, forwardRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { WeUIGallery } from '../gallery/weui.gallery';

/**
 * 文件信息
 */
export class WeUIFile {
    /**
     * 所选文件
     */
    file?: File;

    /**
     * 文件URL
     */
    fileURL?: any;

    /**
     * 此文件的上传进度
     */
    progress = 0;

    /**
     * 错误消息
     */
    error: string | Error | null;

    /**
     * 是否正在上传
     */
    isUploading = false;

    /**
     * 是否已经上传
     */
    isUploaded = false;

    /**
     * 是否存在错误
     */
    hasError(): boolean {
        return !!this.error;
    }

    hasMessage(): boolean {
        return this.hasError() || (this.progress > 0 && this.progress < 100);
    }

    /**
     * 重置状态<br>
     * 上传进度设置为0，错误消息为null，isUploading和isUploaded均设置为false。
     */
    reset(): void {
        this.progress = 0;
        this.error = null;
        this.isUploading = false;
        this.isUploaded = false;
    }

    constructor(file: File, fileURL?: any) {
        this.file = file;
        this.fileURL = fileURL;
    }
}

@Component({
    selector: 'weui-uploader',
    template: `
        <div class="weui-uploader">
            <div class="weui-uploader__hd">
                <p class="weui-uploader__title">图片上传</p>
                <div class="weui-uploader__info">{{getUploadedFileCount()}}/{{getFileCount()}}</div>
            </div>
            <div class="weui-uploader__bd">
                <ul class="weui-uploader__files">
                    <li class="weui-uploader__file" *ngFor="let file of files"
                        [style.background-image]="file.fileURL"
                        [ngClass]="{'weui-uploader__file_status': file.hasMessage()}"
                        (click)="preview(file)">
                        <div class="weui-uploader__file-content" *ngIf="file.hasMessage()">
                            <div class="weui-uploader__file-progress"
                                *ngIf="file.isUploading && file.progress && !file.hasError()">{{file.progress}}%</div>
                            <i class="weui-icon-warn" *ngIf="file.hasError()"></i>
                        </div>
                    </li>
                </ul>
                <div class="weui-uploader__input-box">
                    <input class="weui-uploader__input" type="file" accept="image/*" multiple (change)="onSelect($event)" />
                </div>
            </div>
        </div>
        <weui-gallery [image]="image" [canDelete]="true" (delete)="onDelete($event)" (click)="fadeOut()"></weui-gallery>
    `
})
export class WeUIUploader {

    /**
     * 图片预览控件
     */
    @ViewChild(forwardRef(() => WeUIGallery)) gallery: WeUIGallery;

    // 已选文件
    public files: WeUIFile[] = [];

    /**
     * 预览时用
     * @internal
     */
    public image: WeUIFile;

    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private sanitizer: DomSanitizer) {

    }

    /**
     * 获取列表中的文件
     */
    getFiles(): WeUIFile[] {
        return this.files;
    }

    /**
     * 文件总数
     * @internal
     */
    getFileCount(): number {
        return this.files.length;
    }

    /**
     * 已上传文件数
     * @internal
     */
    getUploadedFileCount(): number {
        return this.files.filter((file: WeUIFile) => file.isUploaded).length;
    }

    /**
     * 选择图片文件
     */
    onSelect(event: Event): void {
        const picker = event.target as HTMLInputElement;
        const files = picker && picker.files;
        if (!files) {
            return;
        }

        const length = files.length;
        for (let i = 0; i < length; i++) {
            const file: File = files.item(i);
            const url: string = 'url(' + window.URL.createObjectURL(file) + ')';
            const safeUrl = this.sanitizer.bypassSecurityTrustStyle(url);
            this.files.push(new WeUIFile(file, safeUrl));
        }
    }

    /**
     * 预览图片
     */
    preview(file: WeUIFile): void {
        this.image = file;
        if (this.gallery) {
            this.gallery.show();
        }
    }

    /**
     * 退出预览
     */
    fadeOut(): void {
        if (this.gallery) {
            this.gallery.hide();
        }
    }

    /**
     * 删除文件
     * @param {file} 需要从列表中删除的图片
     */
    onDelete(file: WeUIFile): void {
        const index = this.files.indexOf(file);
        if (index >= 0) {
            this.files.splice(index, 1);
        }
    }
}
