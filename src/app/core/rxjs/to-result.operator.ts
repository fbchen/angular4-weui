/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Operator } from 'rxjs/Operator';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';

import { Result } from '../result';

/**
 * Applies a given `project` function to each value emitted by the source
 * Observable, and emits the resulting values as an Observable.
 *
 */
export function toResult<R>(thisArg?: any): Observable<R> {
    return this.lift(new ToResultOperator(thisArg));
}

// tslint:disable-next-line:callable-types
export interface ToResultSignature<T> {
    (thisArg?: any): Observable<Result>;
}

export class ToResultOperator<T, R> implements Operator<T, R> {

    constructor(private thisArg: any) {

    }

    call(subscriber: Subscriber<R>, source: any): any {
        return source._subscribe(new ToResultSubscriber(subscriber, this.thisArg));
    }
}

/**
 * We need this JSDoc comment for affecting ESDoc.
 * @ignore
 * @extends {Ignored}
 */
class ToResultSubscriber<T, R> extends Subscriber<T> {
    public count = 0;
    private thisArg: any;

    constructor(destination: Subscriber<R>, thisArg: any) {
        super(destination);
        this.thisArg = thisArg || this;
    }

    public project(value: T, index: number): Result {
        if (value['error']) {
            this.destination.error(value['error'] as Result);
            return;
        }
        return value['result'] as Result;
    }

    // NOTE: This looks unoptimized, but it's actually purposefully NOT
    // using try/catch optimizations.
    protected _next(value: T) {
        let result: any;
        try {
            result = this.project.call(this.thisArg, value, this.count++);
        } catch (err) {
            this.destination.error(err);
            return;
        }
        this.destination.next(result);
    }
}
