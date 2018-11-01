/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, ElementRef, OnInit } from '@angular/core';
import { UpdateClassService } from '../core/service/update.class.service';
import { isPresent, toNumber } from '../util/lang';

const statusColorMap = {
    normal: '#108ee9',
    exception: '#f04134',
    success: '#00a854',
};

/**
 * Circle 进度圈
 */
@Component({
    selector: 'weui-circle',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `
    <svg [ngClass]="canvasClass" viewBox="0 0 100 100">
        <path
            [ngClass]="circleTrailClass"
            [attr.stroke]="trailColor"
            [attr.stroke-width]="trailWidth || strokeWidth"
            [attr.fill-opacity]="0"
            [attr.d]="circleData.pathString"
            [ngStyle]="circleData.trailPathStyle"
        ></path>

        <path *ngIf="showCirclePath"
            [ngClass]="circlePathClass"
            [attr.stroke]="strokeColor"
            [attr.stroke-width]="strokeWidth"
            [attr.fill-opacity]="0"
            [attr.stroke-linecap]="strokeLinecap"
            [attr.d]="circleData.pathString"
            [ngStyle]="circleData.strokePathStyle"
        ></path>
    </svg>
    `
})
export class WeUICircle implements OnInit {

    /** 百分比 */
    @Input()
    get percent(): number {
        return this._percent;
    }
    set percent(percent: number) {
        if (isPresent(percent)) {
            const value = toNumber(percent, 0);
            if (this._percent !== value) {
                this._percent = value;
                this.updateCircleData();
            }
        }
    }
    private _percent = 0;

    /** 圆形进度条线的厚度，单位是进度条画布宽度的百分比 */
    @Input()
    get trailWidth(): number {
        return this._trailWidth;
    }
    set trailWidth(trailWidth: number) {
        if (isPresent(trailWidth)) {
            const value = toNumber(trailWidth, 0);
            if (this._trailWidth !== value) {
                this._trailWidth = value;
                this.updateCircleData();
            }
        }
    }
    private _trailWidth = 16;

    /** 圆形进度条线的宽度，单位是进度条画布宽度的百分比 */
    @Input()
    get strokeWidth(): number {
        return this._strokeWidth;
    }
    set strokeWidth(strokeWidth: number) {
        if (isPresent(strokeWidth)) {
            const value = toNumber(strokeWidth, 0);
            if (this._strokeWidth !== value) {
                this._strokeWidth = value;
                this.updateCircleData();
            }
        }
    }
    private _strokeWidth = 16;


    /** 圆形进度条线的颜色 */
    @Input()
    get strokeColor(): string {
        return this._strokeColor;
    }
    set strokeColor(strokeColor: string) {
        if (this._strokeColor !== strokeColor) {
            this._strokeColor = strokeColor;
            this.updateCircleData();
        }
    }
    private _strokeColor = '#108ee9';

    /*
    @Input() successColor: string;
    @Input() exceptionColor: string;
    */

    /**
     * 圆形进度条线条末端线帽的样式，可选值为 `butt` `round` `square`。默认为`round`。
     * <ul>
     * <li> butt: 向线条的每个末端添加平直的边缘; </li>
     * <li> round: 向线条的每个末端添加圆形线帽; </li>
     * <li> square: 向线条的每个末端添加正方形线帽。 </li>
     * </ul>
     */
    @Input()
    get strokeLinecap(): 'butt' | 'round' | 'square' {
        return this._strokeLinecap;
    }
    set strokeLinecap(strokeLinecap: 'butt' | 'round' | 'square') {
        if (this._strokeLinecap !== strokeLinecap) {
            this._strokeLinecap = strokeLinecap;
            this.updateCircleData();
        }
    }
    private _strokeLinecap: 'butt' | 'round' | 'square' = 'round';


    /** 圆形进度条线的轮廓颜色 */
    @Input()
    get trailColor(): string {
        return this._trailColor;
    }
    set trailColor(trailColor: string) {
        if (this._trailColor !== trailColor) {
            this._trailColor = trailColor;
            this.updateCircleData();
        }
    }
    private _trailColor = '#D9D9D9';


    /** 圆形进度条缺口位置，可选值为 `top` `bottom` `left` `right`。默认为`top`。 */
    @Input()
    get gapPosition(): 'top' | 'bottom' | 'left' | 'right' {
        return this._gapPosition;
    }
    set gapPosition(gapPosition: 'top' | 'bottom' | 'left' | 'right') {
        if (this._gapPosition !== gapPosition) {
            this._gapPosition = gapPosition;
            this.updateCircleData();
        }
    }
    private _gapPosition: 'top' | 'bottom' | 'left' | 'right' = 'top';


    /** 圆形进度条缺口角度，可取值 0 ~ 360 */
    @Input()
    get gapDegree(): number {
        return this._gapDegree;
    }
    set gapDegree(gapDegree: number) {
        if (isPresent(gapDegree)) {
            const value = toNumber(gapDegree, 0);
            if (this._gapDegree !== value) {
                this._gapDegree = value;
                this.updateCircleData();
            }
        }
    }
    private _gapDegree = 0;


    private _lastDrawTime = new Date();

    // 内部样式
    public canvasClass: any;
    public circleTrailClass: any;
    public circlePathClass: any;
    public circleData: {pathString?: string, trailPathStyle?: any, strokePathStyle?: any} = {};

    constructor(
        protected el: ElementRef,
        protected updateClassService: UpdateClassService) {

    }

    ngOnInit(): void {
        this.updateCircleData();
        this.updateClassMap();
    }

    protected updateClassMap(): void {
        this.canvasClass = `weui-circle`;
        this.circleTrailClass = `weui-circle-trail`;
        this.circlePathClass = `weui-circle-path`;
    }

    protected updateCircleData(): void {
        const interval = this._lastDrawTime ? (new Date().getTime() - this._lastDrawTime.getTime()) : 0;
        const percent = this.percent;
        const gapDegree = this.gapDegree || 0;

        const radius = 50 - (this.strokeWidth / 2);
        let beginPositionX = 0;
        let beginPositionY = -radius;
        let endPositionX = 0;
        let endPositionY = radius * -2;
        switch (this.gapPosition) {
            case 'left':
                beginPositionX = -radius;
                beginPositionY = 0;
                endPositionX = radius * 2;
                endPositionY = 0;
                break;
            case 'right':
                beginPositionX = radius;
                beginPositionY = 0;
                endPositionX = radius * -2;
                endPositionY = 0;
                break;
            case 'bottom':
                beginPositionY = radius;
                endPositionY = radius * 2;
                break;
            default:
        }

        const pathString = `M 50,50 m ${beginPositionX},${beginPositionY}
         a ${radius},${radius} 0 1 1 ${endPositionX},${-endPositionY}
         a ${radius},${radius} 0 1 1 ${-endPositionX},${endPositionY}`;
        const len = Math.PI * 2 * radius;
        const trailPathStyle = {
            stroke: this.trailColor,
            strokeDasharray: `${len - gapDegree}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`,
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s'
        };
        const strokePathStyle = {
            stroke: this.strokeColor,
            strokeDasharray: `${(percent / 100) * (len - gapDegree)}px ${len}px`,
            strokeDashoffset: `-${gapDegree / 2}px`,
            transition: 'stroke-dashoffset .3s ease 0s, stroke-dasharray .3s ease 0s, stroke .3s',
            transitionDuration: interval > 0 && interval < 100 ? '0s, 0s' : '0.3s, 0.3s'
        };

        this.circleData = { pathString, trailPathStyle, strokePathStyle };
    }

    get showCirclePath(): boolean {
        return this.percent > 0;
    }

}
