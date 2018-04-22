/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, ElementRef, Renderer2, OnInit, AfterViewInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';


@Component({
    selector: 'weui-actionsheet',
    template: `
        <div class="weui-mask" [@visibility]="visibility" (@visibility.done)="onVisibleChange($event)" (click)="hide()"></div>
        <div class="weui-actionsheet" [ngClass]="{'weui-actionsheet_toggle': isToggleClassEnable()}">
            <div class="weui-actionsheet__menu">
                <div class="weui-actionsheet__cell" *ngFor="let m of menu" (click)="onSelect(m)">{{m.text}}</div>
            </div>
            <div class="weui-actionsheet__action" *ngIf="mode == 'ios'">
                <div class="weui-actionsheet__cell" (click)="hide()">{{cancelText}}</div>
            </div>
        </div>
    `,
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    animations: [
        trigger('visibility', [
            state('show', style({ opacity: 1 })),
            state('hide', style({ opacity: 0 })),
            transition('hide <=> show', [animate(200)])
        ])
    ]
})
export class WeUIActionSheet implements OnInit, AfterViewInit {

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
    @Input()
    get mode(): string {
        return this._mode;
    }
    set mode(mode: string) {
        if (this._mode !== mode) {
            this._mode = mode;
            this.updateClassMap();
        }
    }
    private _mode = 'ios';

    /**
     * @i18n 取消
     */
    @Input() cancelText: string = this.defaults.cancelText;

    /**
     * 显示对象
     */
    @Output() open = new EventEmitter<void>();

    /**
     * 隐藏对象
     */
    @Output() close = new EventEmitter<void>();


    /**
     * 用于控制动画的触发(trigger)
     */
    public get visibility(): 'show' | 'hide' {
        return this._visibility;
    }
    public set visibility(visibility: 'show' | 'hide') {
        this._visibility = visibility;
        if (visibility === 'show') {
            this.renderer.removeClass(this.el.nativeElement, 'weui-hide');
            setTimeout(() => this.shown = true, 10);
        } else {
            this.shown = false;
        }
    }
    private _visibility: 'show' | 'hide' = 'hide';

    /** 已显示否 */
    private shown = false;
    private isViewInit = false;

    /** 用户操作反馈 */
    private resolve: (value?: any) => void;

    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService) {

    }

    ngOnInit(): void {
        this.updateClassMap();
    }

    ngAfterViewInit(): void {
        setTimeout(() => this.isViewInit = true, 10);
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-actionsheet-${this.mode}`]: this.mode,
            [`weui-skin_android`]: this.mode === 'md',
            [`weui-hide`]: !this.shown
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    onVisibleChange(e: any): void {
        this.shown = this.visibility === 'show';
        this.updateClassMap();
        if (this.shown) {
            this.open.emit();
        } else {
            this.close.emit();
        }
    }

    isToggleClassEnable(): boolean {
        return this.shown && this.isViewInit && this.mode === 'ios';
    }

    /**
     * 显示菜单
     */
    show(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.resolve = resolve;
            this.visibility = 'show';
        });
    }

    /**
     * 隐藏菜单
     */
    hide(): void {
        this.visibility = 'hide';
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
