import { ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injectable, ApplicationRef, Injector, NgZone, Type } from '@angular/core';

import { WeUIDialog } from '../dialog/weui.dialog';
import { WeUIToast } from '../toast/weui.toast';
import { WeUITopTips } from '../toptips/weui.toptip';
import { WeUIActionSheet } from '../actionsheet/weui.actionsheet';

/** Next overlay unique ID. */
let nextUniqueId = 0;

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
     * 显示Alert
     *
     * @param message  消息
     * @param title    标题(可选)
     * @param handler  处理方法
     */
    public showAlert(message: string, title?: string): Promise<any> {
        const dialog: WeUIDialog = this._createDialog();
        dialog.content = message;
        dialog.title = title;
        dialog.showNOButton = false;
        return dialog.show();
    }

    /**
     * 显示Confirm，默认带两个按钮（取消、确定）
     *
     * @param message  消息，或者自定义对话框属性对象
     * @param title    标题
     */
    public showConfirm(message: string | { [key: string]: any }, title?: string): Promise<any> {
        const dialog: WeUIDialog = this._createDialog();

        if (typeof message === 'object') {
            for (const key in message) {
                if (message.hasOwnProperty(key)) {
                    dialog[key] = message[key];
                }
            }
        } else {
            dialog.content = message;
            dialog.title = title;
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


    /**
     * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
     * @param portal Portal to be attached
     */
    /*
    attachComponentPortal<T>(portal: ComponentPortal<T>): ComponentRef<T> {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let componentRef: ComponentRef<T>;

        // If the portal specifies a ViewContainerRef, we will use that as the attachment point
        // for the component (in terms of Angular's component tree, not rendering).
        // When the ViewContainerRef is missing, we use the factory to create the component directly
        // and then manually attach the view to the application.
        if (portal.viewContainerRef) {
            componentRef = portal.viewContainerRef.createComponent(
                componentFactory,
                portal.viewContainerRef.length,
                portal.injector || portal.viewContainerRef.parentInjector);

            this.setDisposeFn(() => componentRef.destroy());
        } else {
            componentRef = componentFactory.create(portal.injector || this._defaultInjector);
            this._appRef.attachView(componentRef.hostView);
            this.setDisposeFn(() => {
                this._appRef.detachView(componentRef.hostView);
                componentRef.destroy();
            });
        }
        // At this point the component has been instantiated, so we move it to the location in the DOM
        // where we want it to be rendered.
        this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));

        return componentRef;
    }
    */
}
