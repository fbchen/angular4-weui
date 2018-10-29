/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */
import { Observable } from 'rxjs';
import { Result } from '../../result';

/**
 * an operator that take result from Response
 */
export const toResult = () => <T>(source: Observable<T>) =>
    new Observable<Result>(observer => {
        return source.subscribe({
            next(x) {
                // tslint:disable-next-line:no-string-literal
                if (x['error']) {
                    // tslint:disable-next-line:no-string-literal
                    observer.error(x['error']);
                    return;
                }
                // tslint:disable-next-line:no-string-literal
                observer.next(x['result']);
            },
            error(err) { observer.error(err); },
            complete() { observer.complete(); }
        });
    });
