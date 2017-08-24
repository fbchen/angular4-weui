import { ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, ApplicationRef, Injector, NgZone, Type } from '@angular/core';

import { WeUIDialog } from '../dialog/weui.dialog';
import { WeUIToast } from '../toast/weui.toast';
import { WeUITopTips } from '../toptips/weui.toptip';
import { WeUIActionSheet } from '../actionsheet/weui.actionsheet';

/** Next overlay unique ID. */
let nextUniqueId = 0;

export interface DialogProps {
    mode?: string;
    title?: string;
    content?: string;
    btnNOText?: string;
    btnOKText?: string;
    showNOButton?: boolean;
    type?: string | null;
    icon?: string;
    iconCls?: string;
};

/**
 * 浮层通用接口
 */
@Injectable()
export class Layer {

    constructor(
        private _componentFactoryResolver: ComponentFactoryResolver,
        private _appRef: ApplicationRef,
        private _injector: Injector,
        private _ngZone: NgZone) {

    }

    /**
     * Creates the DOM element for an overlay and appends it to the document.
     * @returns Newly-created pane element
     */
    private _createDivElement(): HTMLElement {
        const div: HTMLDivElement = document.createElement('div');
        div.id = `weui-overlay-${nextUniqueId++}`;
        div.classList.add('weui-overlay-pane');
        document.body.appendChild(div);

        return div;
    }

    private _createCompInstance<T>(component: Type<T>): ComponentRef<T> {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
        const componentRef: ComponentRef<T> = componentFactory.create(this._injector);
        this._appRef.attachView(componentRef.hostView);

        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        const _hostDomElement = this._createDivElement();
        _hostDomElement.appendChild(this._getComponentRootNode(componentRef));

        return componentRef;
    }

    private _createDialog(): WeUIDialog {
        const componentRef = this._createCompInstance(WeUIDialog);
        componentRef.instance.deactivate.subscribe(() => {
            componentRef.destroy();
        });
        return componentRef.instance;
    }

    /**
     * 显示Success
     *
     * @param message  消息
     * @param title    标题(可选)
     */
    public success(message: string, title?: string): Promise<any> {
        return this.showAlert(message, title, 'success');
    }

    /**
     * 显示Info
     *
     * @param message  消息
     * @param title    标题(可选)
     */
    public info(message: string, title?: string): Promise<any> {
        return this.showAlert(message, title, 'info');
    }

    /**
     * 显示Error
     *
     * @param message  消息
     * @param title    标题(可选)
     */
    public error(message: string, title?: string): Promise<any> {
        return this.showAlert(message, title, 'error');
    }

    /**
     * 显示Warning
     *
     * @param message  消息
     * @param title    标题(可选)
     */
    public warning(message: string, title?: string): Promise<any> {
        return this.showAlert(message, title, 'warning');
    }

    /**
     * 显示Alert
     *
     * @param message  消息
     * @param title    标题(可选)
     * @param type     告警等级
     */
    public showAlert(message: string | DialogProps, title?: string, type?: string): Promise<any> {
        const dialog: WeUIDialog = this._createDialog();
        dialog.showNOButton = false;
        if (typeof message === 'object') {
            for (const key in message) {
                if (message.hasOwnProperty(key) && typeof message[key] !== 'undefined') {
                    dialog[key] = message[key];
                }
            }
        } else {
            dialog.content = message;
            dialog.title = title || '';
            dialog.type = type || null;
        }
        return dialog.show();
    }

    /**
     * 显示Confirm，默认带两个按钮（取消、确定）
     *
     * @param message  消息，或者自定义对话框属性对象
     * @param title    标题
     */
    public showConfirm(message: string | DialogProps, title?: string): Promise<any> {
        const dialog: WeUIDialog = this._createDialog();

        if (typeof message === 'object') {
            for (const key in message) {
                if (message.hasOwnProperty(key) && typeof message[key] !== 'undefined') {
                    dialog[key] = message[key];
                }
            }
        } else {
            dialog.content = message;
            dialog.title = title || '';
        }

        return dialog.show();
    }



    private _createToast(): WeUIToast {
        const componentRef = this._createCompInstance(WeUIToast);
        componentRef.instance.deactivate.subscribe(() => {
            componentRef.destroy();
        });
        return componentRef.instance;
    }

    /**
     * 显示Loading Toast
     *
     * @param message  消息，默认为“数据加载中”
     */
    public showLoading(message?: string): WeUIToast {
        const toast: WeUIToast = this._createToast();
        if (message) {
            toast.content = message;
        }
        toast.success = !(toast.loading = true);
        toast.show();
        return toast;
    }

    /**
     * 显示成功Success Toast
     *
     * @param message  消息，默认为“操作成功”
     */
    public showSuccess(message?: string): void {
        const toast: WeUIToast = this._createToast();
        if (message) {
            toast.content = message;
        }
        toast.loading = !(toast.success = true);
        toast.show();
    }

    /**
     * 在顶部显示错误消息
     *
     * @param message  错误消息
     */
    public showError(message: string): void {
        const componentRef = this._createCompInstance(WeUITopTips);
        componentRef.instance.deactivate.subscribe(() => {
            componentRef.destroy();
        });

        const tip: WeUITopTips = componentRef.instance;
        if (message) {
            tip.content = message;
        }
        tip.show();
    }

    private _createActionSheet(): WeUIActionSheet {
        const componentRef = this._createCompInstance(WeUIActionSheet);
        componentRef.instance.deactivate.subscribe(() => {
            componentRef.destroy();
        });
        return componentRef.instance;
    }

    /**
     * 显示ActionSheet菜单
     *
     * @param buttons 菜单按钮
     * @param btnCancelText 取消按钮文本，默认为“取消”
     */
    public showActionsheet(menus: { text?: string, [key: string]: any }[], btnCancelText?: string): Promise<any> {
        const actionsheet: WeUIActionSheet = this._createActionSheet();
        actionsheet.menu = menus;
        if (btnCancelText) {
            actionsheet.cancelText = btnCancelText;
        }
        return actionsheet.show();
    }

    /** Gets the root HTMLElement for an instantiated component. */
    private _getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
        return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    }

}
