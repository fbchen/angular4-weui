/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AbstractPage } from '../abstract-page';

import { WeUIUploader, WeUIFile } from '../../../app/weui/uploader/weui.uploader';

@Component({
    templateUrl: 'example.html'
})
export class UploaderExamplePage extends AbstractPage {

    @ViewChild('uploader') uploader: WeUIUploader;

    private timer: any;

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute) {
        super(element, router, route);
    }

    upload(): void {
        const files: WeUIFile[] = this.uploader.files;
        if (!files.length) {
            alert('Please select images to upload！');
            return;
        }

        Observable.from(files)
            .filter((file: WeUIFile): boolean => !file.isUploaded)
            .concatMap((file: WeUIFile, index: number) => this.uploadFile(file, index))
            .subscribe((file: WeUIFile) => {
                if (file.hasError()) {
                    console.log('文件“' + file.file.name + '”上传失败，原因：' + file.error);
                } else {
                    console.log('文件“' + file.file.name + '”上传成功！');
                }
            }, (err: any) => {
                console.error(err);
            });
    }

    uploadFile(file: WeUIFile, index: number): Subject<WeUIFile> | ArrayLike<WeUIFile> {
        file.reset(); // 重置进度等
        file.isUploading = true;
        const subject = new Subject<WeUIFile>();

        this.timer = setInterval(() => {
            file.progress += 10;

            // 上传成功的例子
            if (file.progress >= 100) {
                clearInterval(this.timer);
                file.isUploading = false;
                file.isUploaded = true;
                subject.next(file);
                subject.complete();
            }

            // 上传失败的例子
            if (index % 2 === 1 && file.progress >= 90) {
                clearInterval(this.timer);
                file.isUploading = false;
                file.isUploaded = false;
                file.error = '服务器错误';
                subject.next(file);
                subject.complete();
            }
        }, 200);

        return subject;
    }

}
