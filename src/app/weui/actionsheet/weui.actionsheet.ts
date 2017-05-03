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
    selector: 'weui-actionsheet',
    template: `
        <div class="weui-mask" [@visibility]="visibility" (click)="hide()"></div>
        <div class="weui-actionsheet"
            [ngClass]="{'weui-actionsheet_toggle': shown && mode == 'ios'}">
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell" *ngFor="let m of menu" (click)="onSelect(m)">{{m.text}}</div>
            </div>
            <div class="weui-actionsheet__action" *ngIf="mode == 'ios'">
                <div class="weui-actionsheet__cell" (click)="hide()">{{cancelText}}</div>
            </div>
        </div>
    `,
    animations: [trigger('visibility', [
        state('show', style({ opacity: 1 })),
        state('hide', style({ opacity: 0 })),
        transition('hide <=> show', [animate(200)])
    ])]
})
export class WeUIActionSheet {

    /**
     * @i18n
     */
    defaults: any = {
        cancelText: '取消'
    };

    /**
     * ActionSheet菜单，列表，内容任意，其中<code>text</code>用于显示
     */
    @Input() menu: { text?: string, [key: string]: any }[] = [];

    /**
     * ActionSheet弹出模式，取值：ios(Ios模式) - 从底部上弹，md(Android模式) - 弹出在窗口中间。默认为ios。
     */
    @Input() mode = 'ios';

    /**
     * @i18n 取消
     */
    @Input() cancelText: string = this.defaults.cancelText;

    /**
     * 安卓模式下的特殊样式
     */
    @HostBinding('class.weui-skin_android') get androidCls(): boolean {
        return this.mode === 'md';
    }

    /**
     * 用于控制控件的可视化
     */
    @HostBinding('class.weui-hide') get hideCls(): boolean {
        return !this._show;
    }

    /**
     * 用于控制动画的触发(trigger)
     */
    get visibility(): string {
        return this.shown ? 'show' : 'hide';
    }

    /**
     * 已显示否
     * @internal
     */
    public shown = false; // (显示时，先_show，然后才shown)
    public _show = false; // 解决transition动画与display冲突的问题

    /* @internal */
    private resolve: (value?: any) => void;

    constructor() {

    }

    /**
     * 显示菜单
     */
    show(): Promise<any> {
        this._show = true;
        setTimeout(() => { // 解决transition动画与display冲突的问题
            this.shown = true;
        }, 10);

        return new Promise<any>((resolve, reject) => {
            this.resolve = resolve;
        });
    }

    /**
     * 隐藏菜单
     */
    hide(): void {
        this.shown = false;
        setTimeout(() => {
            this._show = false;
        }, 200);
    }

    /**
     * 选择某个菜单，执行Promise.resolve()方法，并将选中的menu作为参数；最后，关闭ActionSheet
     *
     * @param menu 被选择的菜单
     */
    onSelect(menu: { text?: string, [key: string]: any }): void {
        this.resolve(menu);
        this.hide();
    }

}
