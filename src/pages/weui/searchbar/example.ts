/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response } from '@angular/http';

import { AbstractPage } from '../abstract-page';

@Component({
    templateUrl: 'example.html'
})
export class SearchBarExamplePage extends AbstractPage implements OnInit {

    public list: any[];

    private value = '';

    public get showResult(): boolean {
        return this.value.length > 0;
    }

    constructor(
        public element: ElementRef,
        public router: Router,
        public route: ActivatedRoute,
        private http: Http) {
        super(element, router, route);
    }

    ngOnInit(): void {
        super.ngOnInit();

        // 查询博客
        this.http.get('https://jsonplaceholder.typicode.com/posts').subscribe((response: Response) => {
            this.list = response.json();
        });
    }

    search(value: string): void {
        this.value = value;
    }

    filter(item: any): boolean {
        if (!this.value) {
            return true;
        }
        return item.title.toUpperCase().indexOf(this.value.toUpperCase()) >= 0;
    }

    get filterFn(): Function {
        return this.filter.bind(this);
    }

}
