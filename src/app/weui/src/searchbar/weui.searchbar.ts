/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
    selector: 'weui-searchbar',
    template: `
        <div class="weui-search-bar" [ngClass]="{'weui-search-bar_focusing': focusing}">
            <form class="weui-search-bar__form">
                <div class="weui-search-bar__box">
                    <i class="weui-icon-search"></i>
                    <input #searchBox type="search" name="search" class="weui-search-bar__input"
                        [placeholder]="placeholder" [required]="required"
                        (focus)="onFocus()" (blur)="onBlur()" [(ngModel)]="value" (keyup)="push(searchBox.value)" />
                    <a href="javascript:" class="weui-icon-clear" (click)="clear()"></a>
                </div>
                <label class="weui-search-bar__label" (click)="doFocus()">
                    <i class="weui-icon-search"></i>
                    <span>{{placeholder}}</span>
                </label>
            </form>
            <a href="javascript:" class="weui-search-bar__cancel-btn" (click)="onCancel()">{{cancelText}}</a>
        </div>
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
    @Output() search = new EventEmitter<string>();

    // 输入控件
    @ViewChild('searchBox') searchBox: ElementRef;

    public focusing = false;

    public value = '';

    private searchTerms = new Subject<string>();
    private _searchTermsChangesSubscription: Subscription;

    constructor() {

    }

    ngOnInit(): void {
        this._searchTermsChangesSubscription = this.searchTerms
            .debounceTime(300)        // wait for 300ms pause in events
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .subscribe((term: string) => {
                this.search.emit(term);
            });
    }

    ngOnDestroy(): void {
        if (this._searchTermsChangesSubscription) {
            this._searchTermsChangesSubscription.unsubscribe();
        }
    }

    doFocus(): void {
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
        this.search.emit('');
    }

    // Push a search term into the observable stream.
    push(term: string): void {
        this.searchTerms.next(term);
    }

    clear(): void {
        this.value = '';
        this.doFocus();
    }

}
