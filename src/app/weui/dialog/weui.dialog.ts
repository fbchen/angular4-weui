/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, HostBinding } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/core';

@Component({
    selector: 'weui-dialog',
    template: `
        <div class="weui-mask"></div>
        <div class="weui-dialog" [ngClass]="{'weui-skin_android': mode == 'md'}">
            <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
            <div class="weui-dialog__bd">{{content}}</div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" (click)="negativeClick($event)" *ngIf="showNOButton"
                    class="weui-dialog__btn weui-dialog__btn_default">{{btnNOText || defaults.btnNOText}}</a>
                <a href="javascript:;" (click)="positiveClick($event)"
                    class="weui-dialog__btn weui-dialog__btn_primary">{{btnOKText || defaults.btnOKText}}</a>
            </div>
        </div>
    `,
    animations: [trigger('visibility', [
        state('show', style({ opacity: 1, display: 'block' })),
        state('hide', style({ opacity: 0, display: 'none' })),
        transition('hide <=> show', [animate(200)])
    ])]
})
export class WeUIDialog {

    /**
     * @i18n
     */
    defaults: any = {
       btnNOText: '取消',
       btnOKText: '确定'
    };

    /**
     * ActionSheet弹出模式，取值：ios(Ios模式) - 从底部上弹，md(Android模式) - 弹出在窗口中间。默认为ios。
     */
    @Input() mode = 'ios';

    /**
     * 标题
     */
    @Input() title: string;

    /**
     * 内容
     */
    @Input() content: string;

    /**
     * @i18n 取消
     */
    @Input() btnNOText: string = this.defaults.btnNOText;

    /**
     * @i18n 确定
     */
    @Input() btnOKText: string = this.defaults.btnOKText;

    /**
     * 是否显示“取消”按钮
     */
    @Input() showNOButton = true;

    /**
     * 用于控制动画的触发(trigger)
     */
    @HostBinding('@visibility') get visibility(): string {
        return this.shown ? 'show' : 'hide';
    }

    /**
     * 已显示否
     * @internal
     */
    private shown = false;

    /* @internal */
    private resolve: (value?: any) => void;
    /* @internal */
    private reject: (value?: any) => void;

    constructor() {

    }

    /**
    * 显示对话框
    */
    show(): Promise<any> {
        this.shown = true;

        return new Promise<any>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
        });
    }

    /**
     * 隐藏对话框
     */
    hide(): void {
        this.shown = false;
    }

    /**
     * 点击【取消】，执行Promise.reject()方法；然后，关闭对话框
     */
    negativeClick(event: MouseEvent): void {
        this.reject();
        this.hide();
    }

    /**
     * 点击【确定】，执行Promise.resolve()方法；然后，关闭对话框
     */
    positiveClick(event: MouseEvent): void {
        this.resolve();
        this.hide();
    }

}
