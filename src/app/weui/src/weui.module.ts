/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

/**
 * Import Angular
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/** Import WeUI Components */
import { WeUIBadge } from './badge/weui.badge';
import { WeUIButton } from './button/weui.button';
import { WeUICheckbox } from './input/weui.checkbox';
import { WeUICircle } from './progress/weui.circle';
import { WeUIDatePicker } from './picker/weui.date.picker';
import { WeUIFooter, WeUIFooterText, WeUIFooterLinks, WeUIFooterLink } from './footer/weui.footer';
import { WeUIGallery } from './gallery/weui.gallery';
import { WeUIInput } from './input/weui.input';
import { WeUIItems } from './list/weui.items';
import { WeUIItem } from './list/weui.item';
import { WeUILink } from './list/weui.link';
import { WeUILoadmore } from './loadmore/weui.loadmore';
import { WeUINavBar } from './navbar/weui.navbar';
import { WeUINavBarItem } from './navbar/weui.navbar.item';
import { WeUIPicker } from './picker/weui.picker';
import { WeUIPickerGroup } from './picker/weui-picker-group';
import { WeUIProgressBar } from './progress/weui.progress';
import { WeUIRadio } from './input/weui.radio';
import { WeUISearchBar } from './searchbar/weui.searchbar';
import { WeUISelect } from './input/weui.select';
import { WeUISlider } from './slider/weui.slider';
import { WeUISwitch } from './input/weui.switch';
import { WeUITabBar } from './tabbar/weui.tabbar';
import { WeUITabBarItem } from './tabbar/weui.tabbar.item';
import { WeUITips } from './list/weui.tips';
import { WeUITitle } from './list/weui.title';
import { WeUIUploader } from './uploader/weui.uploader';
import { FormDirective } from './form/form.directive';
import { FormError } from './form/form.error';


/**
 * Import WeUI Overlay Entry Components
 */
import { WeUIActionSheet } from './actionsheet/weui.actionsheet';
import { WeUIDialog } from './dialog/weui.dialog';
import { WeUIToast } from './toast/weui.toast';
import { WeUITopTips } from './toptips/weui.toptip';
import { Layer } from './overlay/layer';
import { WeUIPickerService } from './picker/weui.picker.service';

/**
 * @name WeUIModule
 * @description
 * WeUIModule is an NgModule that provides weui-style TypeScript/JavaScript components.
 * @author fbchen 2017-03-08
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        WeUIButton,
        WeUIInput,
        WeUIRadio,
        WeUICheckbox,
        WeUISwitch,
        WeUISelect,
        WeUISlider,
        WeUIGallery,
        WeUIUploader,
        WeUIItems,
        WeUIItem,
        WeUILink,
        WeUITitle,
        WeUITips,
        WeUIBadge,
        WeUIFooter,
        WeUIFooterText,
        WeUIFooterLinks,
        WeUIFooterLink,
        WeUILoadmore,
        WeUIProgressBar,
        WeUICircle,
        WeUIActionSheet,
        WeUIDialog,
        WeUIToast,
        WeUITopTips,
        WeUIPicker,
        WeUIDatePicker,
        WeUIPickerGroup,
        WeUISearchBar,
        WeUINavBar,
        WeUINavBarItem,
        WeUITabBar,
        WeUITabBarItem,
        FormDirective,
        FormError
    ],
    exports: [
        WeUIButton,
        WeUIInput,
        WeUIRadio,
        WeUICheckbox,
        WeUISwitch,
        WeUISelect,
        WeUISlider,
        WeUIGallery,
        WeUIUploader,
        WeUIItems,
        WeUIItem,
        WeUILink,
        WeUITitle,
        WeUITips,
        WeUIBadge,
        WeUIFooter,
        WeUIFooterText,
        WeUIFooterLinks,
        WeUIFooterLink,
        WeUILoadmore,
        WeUIProgressBar,
        WeUICircle,
        WeUIActionSheet,
        WeUIDialog,
        WeUIToast,
        WeUITopTips,
        WeUIPicker,
        WeUIDatePicker,
        WeUISearchBar,
        WeUINavBar,
        WeUINavBarItem,
        WeUITabBar,
        WeUITabBarItem,
        FormDirective,
        FormError
    ],
    entryComponents: [
        WeUIActionSheet,
        WeUIDialog,
        WeUIToast,
        WeUITopTips,
        WeUIPicker,
        WeUIDatePicker
    ],
    providers: [
        Layer,
        WeUIPickerService
    ]
})
export class WeUIModule {

}
