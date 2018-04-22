/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, HostBinding, EventEmitter, ElementRef, Renderer2, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';
import { toBoolean } from '../util/lang';

@Component({
    selector: 'weui-dialog',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `
        <div class="weui-mask"></div>
        <div class="weui-dialog" [ngClass]="{'weui-skin_android': mode == 'md'}">
            <div [ngClass]="wrapperClasses">
                <i [ngClass]="iconClasses" *ngIf="iconName"></i>
                <div class="weui-dialog__wrapper_inner">
                    <div class="weui-dialog__hd"><strong class="weui-dialog__title">{{title}}</strong></div>
                    <div class="weui-dialog__bd">
                        {{content}}
                    </div>
                </div>
            </div>
            <div class="weui-dialog__ft">
                <a href="javascript:;" (click)="negativeClick($event)" *ngIf="showNOButton"
                    class="weui-dialog__btn weui-dialog__btn_default">{{btnNOText || defaults.btnNOText}}</a>
                <a href="javascript:;" (click)="positiveClick($event)"
                    class="weui-dialog__btn weui-dialog__btn_primary">{{btnOKText || defaults.btnOKText}}</a>
            </div>
        </div>
    `,
    animations: [
        trigger('visibility', [
            state('show', style({ opacity: 1, display: 'block' })),
            state('hide', style({ opacity: 0, display: 'none' })),
            transition('hide <=> show', [animate(200)])
        ])
    ]
})
export class WeUIDialog implements OnInit {

    /**
     * @i18n
     */
    defaults: any = {
       btnNOText: '取消',
       btnOKText: '确定'
    };

    /**
     * 标题
     */
    @Input() title: string;

    /**
     * 内容
     */
    @Input() content: string;

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

    /** 类型，可选：info, success, error, warning, default */
    @Input()
    get type(): string | null {
        return this._type;
    }
    set type(type: string | null) {
        if (this._type !== type) {
            this._type = type;
            this.updateIconName();
            this.updateIconClasses();
            this.updateWrapperClasses();
        }
    }
    private _type: string | null;

    /** 自定义图标 */
    @Input()
    get icon(): string {
        return this._icon;
    }
    set icon(icon: string) {
        if (this._icon !== icon) {
            this._icon = icon;
            this.updateIconName();
            this.updateIconClasses();
            this.updateWrapperClasses();
        }
    }
    private _icon: string;

    /** 自定义图标样式 */
    @Input()
    get iconCls(): string {
        return this._iconCls;
    }
    set iconCls(iconCls: string) {
        if (this._iconCls !== iconCls) {
            this._iconCls = iconCls;
            this.updateIconClasses();
        }
    }
    private _iconCls: string;


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
     * 隐藏对象
     */
    @Output() close = new EventEmitter<any>();

    /**
     * 用于控制动画的触发(trigger)
     */
    @HostBinding('@visibility') get visibility(): string {
        return this.shown ? 'show' : 'hide';
    }

    /** 已显示否 */
    private shown = false;

    /** 用户操作反馈 */
    private resolve: (value?: any) => void;
    /** 用户操作反馈 */
    private reject: (value?: any) => void;

    // 内部样式
    public iconName: string | null;
    public iconClasses: any;
    public wrapperClasses: any;

    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService) {

    }

    ngOnInit(): void {
        this.updateIconName();
        this.updateIconClasses();
        this.updateWrapperClasses();
        this.updateClassMap();
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-dialog-${this.mode}`]: this.mode
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    private updateIconClasses(): void {
        this.iconClasses = {
            [`weui-dialog-icon`]: 1,
            [`weui-dialog-icon-${this.type}`]: this.type,
            [`${this.iconName}`]: this.iconName,
            [`${this.iconCls}`]: this.iconCls
        };
    }

    private updateIconName(): void {
        if (this.icon) {
            this.iconName = this.icon;
        } else if (this.type) {
            this.iconName = ({
                [`info`]: 'weui-icon-info',
                [`success`]: 'weui-icon-success',
                [`error`]: 'weui-icon-cancel',
                [`warning`]: 'weui-icon-warn',
                [`confirm`]: 'weui-icon-waiting',
                [`default`]: 'weui-icon-info-circle',
            })[this.type];
        } else {
            this.iconName = null;
        }
    }

    updateWrapperClasses(): any {
        this.wrapperClasses = {
            [`weui-dialog__wrapper`]: 1,
            [`weui-dialog__wrapper_with_icon`]: this.iconName
        };
    }

    /**
    * 显示对话框
    */
    show(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.shown = true;
        });
    }

    /**
     * 隐藏对话框
     */
    hide(): void {
        this.shown = false;
        this.close.emit();
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
