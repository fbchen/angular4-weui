/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { Injectable, Inject } from '@angular/core';
import { ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, ApplicationRef, Injector, NgZone, Type } from '@angular/core';
import { ɵgetDOM as getDOM, DOCUMENT } from '@angular/platform-browser';

import { WeUIPicker, PickerOption } from './weui.picker';
import { WeUIDatePicker } from './weui.date.picker';

let seed = 0;
const now = Date.now();

function getUuid() {
    return `_picker_${now}_${seed++}`;
}


/**
 * Picker服务
 */
@Injectable()
export class WeUIPickerService {

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _appRef: ApplicationRef,
        private _injector: Injector,
        private _ngZone: NgZone,
        @Inject(DOCUMENT) private doc: Document) {

    }

    /**
     * 显示单列Picker
     *
     * @param menu  菜单选项
     */
    public showPicker(menu: PickerOption[]): Promise<any> {
        const picker = this.createPicker(WeUIPicker, { menu });
        return picker.show();
    }

    /**
     * 显示多列Picker
     *
     * @param menus  菜单选项（多列）
     */
    public showMultiPicker(menus: PickerOption[][]): Promise<any> {
        const picker = this.createPicker(WeUIPicker, { menus });
        return picker.show();
    }

    /**
     * 显示日期Picker
     *
     * @param config  配置项
     */
    public showDatePicker(config?: any): Promise<any> {
        const picker = this.createPicker(WeUIDatePicker, config);
        return picker.show();
    }



    private createPicker(component: Type<WeUIPicker>, config: any): WeUIPicker {
        const componentRef = this._createComponent(component);
        const instance: WeUIPicker = componentRef.instance;
        instance.close.subscribe(() => {
            componentRef.destroy();
            componentRef['_container'].remove();
        });
        if (config) {
            Object.assign(instance, config);
        }
        this.afterCreate(instance);
        return instance;
    }

    /** this method is called before thild component's ngAfterViewInit */
    protected afterCreate(instance: any): void {

    }


    private _createComponent<T>(component: Type<T>): ComponentRef<T> {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
        const componentRef: ComponentRef<T> = componentFactory.create(this._injector);
        this._appRef.attachView(componentRef.hostView);

        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        const _hostDomElement = this._getContainer();
        _hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        componentRef['_container'] = _hostDomElement;
        return componentRef;
    }

    /** Gets the root HTMLElement for an instantiated component. */
    private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

    private _getContainer(): HTMLElement {
        const div: HTMLElement = getDOM().createElement('div');
        div.id = getUuid();
        div.classList.add('weui-overlay');
        getDOM().appendChild(this.doc.body, div);
        return div;
    }

}
