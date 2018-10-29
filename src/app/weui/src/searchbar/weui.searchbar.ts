/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UpdateClassService } from '../core/service/update.class.service';


@Component({
    selector: 'weui-searchbar',
    preserveWhitespaces: false,
    providers: [ UpdateClassService ],
    template: `
        <form class="weui-search-bar__form">
            <div class="weui-search-bar__box">
                <i class="weui-icon-search"></i>
                <input #searchBox type="search" name="search" class="weui-search-bar__input"
                    [placeholder]="placeholder" [required]="required"
                    (focus)="onFocus()" (blur)="onBlur()" [(ngModel)]="value">
                <a href="javascript:" class="weui-icon-clear" (click)="clear()"></a>
            </div>
            <label class="weui-search-bar__label" (click)="focus()">
                <i class="weui-icon-search"></i>
                <span>{{placeholder}}</span>
            </label>
        </form>
        <a href="javascript:" class="weui-search-bar__cancel-btn" (click)="onCancel()">{{cancelText}}</a>
    `
})
export class WeUISearchBar implements OnInit, OnDestroy {

    /**
     * @i18n
     */
    defaults: any = {
        cancelText: '取消',
        searchText: '搜索'
    };

    /**
     * 是否必填
     */
    @Input() required = true;

    /**
     * @i18n
     * placeholder 规定帮助用户填写输入字段的提示。
     */
    @Input() placeholder: string = this.defaults.searchText;

    /**
     * @i18n 取消
     */
    @Input() cancelText: string = this.defaults.cancelText;

    /**
     * 输入事件
     */
    @Output() weSearch = new EventEmitter<string>();

    // 输入控件
    @ViewChild('searchBox') searchBox: ElementRef;


    // 是否已聚焦
    public get focusing(): boolean {
        return this._focusing;
    }
    public set focusing(focusing: boolean) {
        if (this._focusing !== focusing) {
            this._focusing = focusing;
            this.updateClassMap();
        }
    }
    private _focusing = false;

    // 当前输入框的值
    public get value(): string {
        return this._value;
    }
    public set value(value: string) {
        this._value = value;
        this.push(value);
    }
    private _value = '';


    // 防抖搜索
    private searchTerms = new Subject<string>();
    private searchTermsSubscription: Subscription;

    constructor(
        protected renderer: Renderer2,
        protected el: ElementRef,
        protected updateClassService: UpdateClassService) {

    }


    ngOnInit(): void {
        this.searchTermsSubscription = this.searchTerms.pipe(
            debounceTime(300),     // wait for 300ms pause in events
            distinctUntilChanged() // ignore if next search term is same as previous
        ).subscribe((term: string) => {
            this.weSearch.emit(term);
        });
        // 更新样式
        this.updateClassMap();
    }

    ngOnDestroy(): void {
        if (this.searchTermsSubscription) {
            this.searchTermsSubscription.unsubscribe();
        }
    }

    private updateClassMap(): void {
        const classes = {
            [`weui-search-bar`]: true,
            [`weui-search-bar_focusing`]: this.focusing
        };
        this.updateClassService.update(this.el.nativeElement, classes);
    }

    /** 使光标集中于输入框 */
    focus(): void {
        this.searchBox.nativeElement.focus();
    }

    onFocus(): void {
        this.focusing = true;
    }

    onBlur(): void {
        if (!this.value.length) {
            this.focusing = false;
        }
    }

    onCancel(): void {
        this.value = '';
        this.onBlur();
        this.weSearch.emit('');
    }

    // Push a search term into the observable stream.
    push(term: string): void {
        this.searchTerms.next(term);
    }

    clear(): void {
        this.value = '';
        this.focus();
    }

}
