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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/** Import WeUI Components */
import { WeUIFormControl } from './input/weui.form.control';
import { WeUIBadge } from './badge/weui.badge';
import { WeUIButton } from './button/weui.button';
import { WeUICheckbox } from './input/weui.checkbox';
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

/**
 * Import WeUI Overlay Entry Components
 */
import { WeUIActionSheet } from './actionsheet/weui.actionsheet';
import { WeUIDialog } from './dialog/weui.dialog';
import { WeUIToast } from './toast/weui.toast';
import { WeUITopTips } from './toptips/weui.toptip';

/**
 * Export Components/Directives
 */
export { WeUIFormControl } from './input/weui.form.control';
export { WeUIBadge } from './badge/weui.badge';
export { WeUIButton } from './button/weui.button';
export { WeUICheckbox } from './input/weui.checkbox';
export { WeUIDatePicker } from './picker/weui.date.picker';
export { WeUIFooter, WeUIFooterText, WeUIFooterLinks, WeUIFooterLink } from './footer/weui.footer';
export { WeUIGallery } from './gallery/weui.gallery';
export { WeUIInput } from './input/weui.input';
export { WeUIItems } from './list/weui.items';
export { WeUIItem } from './list/weui.item';
export { WeUILink } from './list/weui.link';
export { WeUILoadmore } from './loadmore/weui.loadmore';
export { WeUINavBar } from './navbar/weui.navbar';
export { WeUINavBarItem } from './navbar/weui.navbar.item';
export { WeUIPicker } from './picker/weui.picker';
export { WeUIPickerGroup } from './picker/weui-picker-group';
export { WeUIProgressBar } from './progress/weui.progress';
export { WeUIRadio } from './input/weui.radio';
export { WeUISearchBar } from './searchbar/weui.searchbar';
export { WeUISelect } from './input/weui.select';
export { WeUISlider } from './slider/weui.slider';
export { WeUISwitch } from './input/weui.switch';
export { WeUITabBar } from './tabbar/weui.tabbar';
export { WeUITabBarItem } from './tabbar/weui.tabbar.item';
export { WeUITips } from './list/weui.tips';
export { WeUITitle } from './list/weui.title';
export { WeUIUploader, WeUIFile } from './uploader/weui.uploader';
export { WeUIActionSheet } from './actionsheet/weui.actionsheet';
export { WeUIDialog } from './dialog/weui.dialog';
export { WeUIToast } from './toast/weui.toast';
export { WeUITopTips } from './toptips/weui.toptip';


/**
 * @name WeUIModule
 * @description
 * WeUIModule is an NgModule that provides weui-style TypeScript/JavaScript components.
 * @author fbchen 2017-03-08
 */
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserAnimationsModule
    ],
    declarations: [
        WeUIFormControl,
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
        WeUITabBarItem
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
        WeUITabBarItem
    ],
    entryComponents: [
        WeUIActionSheet,
        WeUIDialog,
        WeUIToast,
        WeUITopTips
    ],
    providers: []
})
export class WeUIModule {

}
