/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Injector, Type, InjectionToken, InjectFlags } from '@angular/core';

export class LayerInjector implements Injector {

    constructor(private _parentInjector: Injector, private _additionalTokens: WeakMap<any, any>) {

    }

    get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;

    get(token: any, notFoundValue?: any);

    get(token: any, notFoundValue?: any, flags?: any) {
        const value = this._additionalTokens.get(token);

        if (value) {
            return value;
        }

        return this._parentInjector.get<any>(token, notFoundValue);
    }
}
