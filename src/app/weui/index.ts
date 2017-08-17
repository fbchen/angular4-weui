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
import { WeUIFormControl } from './src/input/weui.form.control';
import { WeUIBadge } from './src/badge/weui.badge';
import { WeUIButton } from './src/button/weui.button';
import { WeUICheckbox } from './src/input/weui.checkbox';
import { WeUIDatePicker } from './src/picker/weui.date.picker';
import { WeUIFooter, WeUIFooterText, WeUIFooterLinks, WeUIFooterLink } from './src/footer/weui.footer';
import { WeUIGallery } from './src/gallery/weui.gallery';
import { WeUIInput } from './src/input/weui.input';
import { WeUIItems } from './src/list/weui.items';
import { WeUIItem } from './src/list/weui.item';
import { WeUILink } from './src/list/weui.link';
import { WeUILoadmore } from './src/loadmore/weui.loadmore';
import { WeUINavBar } from './src/navbar/weui.navbar';
import { WeUINavBarItem } from './src/navbar/weui.navbar.item';
import { WeUIPicker } from './src/picker/weui.picker';
import { WeUIPickerGroup } from './src/picker/weui-picker-group';
import { WeUIProgressBar } from './src/progress/weui.progress';
import { WeUIRadio } from './src/input/weui.radio';
import { WeUISearchBar } from './src/searchbar/weui.searchbar';
import { WeUISelect } from './src/input/weui.select';
import { WeUISlider } from './src/slider/weui.slider';
import { WeUISwitch } from './src/input/weui.switch';
import { WeUITabBar } from './src/tabbar/weui.tabbar';
import { WeUITabBarItem } from './src/tabbar/weui.tabbar.item';
import { WeUITips } from './src/list/weui.tips';
import { WeUITitle } from './src/list/weui.title';
import { WeUIUploader } from './src/uploader/weui.uploader';

/**
 * Import WeUI Overlay Entry Components
 */
import { WeUIActionSheet } from './src/actionsheet/weui.actionsheet';
import { WeUIDialog } from './src/dialog/weui.dialog';
import { WeUIToast } from './src/toast/weui.toast';
import { WeUITopTips } from './src/toptips/weui.toptip';
import { Layer } from './src/overlay/layer';

/**
 * Export Components/Directives
 */
export { WeUIFormControl } from './src/input/weui.form.control';
export { WeUIBadge } from './src/badge/weui.badge';
export { WeUIButton } from './src/button/weui.button';
export { WeUICheckbox } from './src/input/weui.checkbox';
export { WeUIDatePicker } from './src/picker/weui.date.picker';
export { WeUIFooter, WeUIFooterText, WeUIFooterLinks, WeUIFooterLink } from './src/footer/weui.footer';
export { WeUIGallery } from './src/gallery/weui.gallery';
export { WeUIInput } from './src/input/weui.input';
export { WeUIItems } from './src/list/weui.items';
export { WeUIItem } from './src/list/weui.item';
export { WeUILink } from './src/list/weui.link';
export { WeUILoadmore } from './src/loadmore/weui.loadmore';
export { WeUINavBar } from './src/navbar/weui.navbar';
export { WeUINavBarItem } from './src/navbar/weui.navbar.item';
export { WeUIPicker } from './src/picker/weui.picker';
export { WeUIPickerGroup } from './src/picker/weui-picker-group';
export { WeUIProgressBar } from './src/progress/weui.progress';
export { WeUIRadio } from './src/input/weui.radio';
export { WeUISearchBar } from './src/searchbar/weui.searchbar';
export { WeUISelect } from './src/input/weui.select';
export { WeUISlider } from './src/slider/weui.slider';
export { WeUISwitch } from './src/input/weui.switch';
export { WeUITabBar } from './src/tabbar/weui.tabbar';
export { WeUITabBarItem } from './src/tabbar/weui.tabbar.item';
export { WeUITips } from './src/list/weui.tips';
export { WeUITitle } from './src/list/weui.title';
export { WeUIUploader, WeUIFile } from './src/uploader/weui.uploader';
export { WeUIActionSheet } from './src/actionsheet/weui.actionsheet';
export { WeUIDialog } from './src/dialog/weui.dialog';
export { WeUIToast } from './src/toast/weui.toast';
export { WeUITopTips } from './src/toptips/weui.toptip';
export { Layer } from './src/overlay/layer';


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
    providers: [Layer]
})
export class WeUIModule {

}
