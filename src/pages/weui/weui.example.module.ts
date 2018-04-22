/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

/* WeUI Module */
import { WeUIModule } from '../../app/weui';

import { WeUIExampleRoutingModule } from './weui.example.routing.module';
import { SharedModule } from '../../app/shared/shared.module';

/** WeUI Demo Components */
import { WeUIExample } from './weui.example';
import { ButtonExamplePage } from './button/example';
import { InputExamplePage } from './input/example';
import { ListExamplePage } from './list/example';
import { SliderExamplePage } from './slider/example';
import { UploaderExamplePage } from './uploader/example';
import { GalleryExamplePage } from './gallery/example';
import { BadgeExamplePage } from './badge/example';
import { FooterExamplePage } from './footer/example';
import { LoadmoreExamplePage } from './loadmore/example';
import { ProgressExamplePage } from './progress/example';

import { ActionsheetExamplePage } from './actionsheet/example';
import { DialogExamplePage } from './dialog/example';
import { ToastExamplePage } from './toast/example';
import { PickerExamplePage } from './picker/example';
import { SearchBarExamplePage } from './searchbar/example';
import { NavBarExamplePage } from './navbar/example';
import { TabBarExamplePage } from './tabbar/example';

/** 无需组件化 */
import { ArticleExamplePage } from './article/example';
import { FlexExamplePage } from './flex/example';
import { GridExamplePage } from './grid/example';
import { IconsExamplePage } from './icons/example';
import { PanelExamplePage } from './panel/example';
import { PreviewExamplePage } from './preview/example';
import { MsgExamplePage, MsgSuccExamplePage, MsgWarnExamplePage } from './msg/example';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        SharedModule,
        WeUIModule,
        WeUIExampleRoutingModule
    ],
    declarations: [
        WeUIExample,
        ButtonExamplePage,
        InputExamplePage,
        ListExamplePage,
        SliderExamplePage,
        UploaderExamplePage,
        GalleryExamplePage,
        BadgeExamplePage,
        FooterExamplePage,
        LoadmoreExamplePage,
        ProgressExamplePage,
        ActionsheetExamplePage,
        DialogExamplePage,
        ToastExamplePage,
        PickerExamplePage,
        SearchBarExamplePage,
        NavBarExamplePage,
        TabBarExamplePage,
        ArticleExamplePage,
        FlexExamplePage,
        GridExamplePage,
        IconsExamplePage,
        PanelExamplePage,
        PreviewExamplePage,
        MsgExamplePage,
        MsgSuccExamplePage,
        MsgWarnExamplePage
    ],
    entryComponents: [
        WeUIExample,
        ButtonExamplePage,
        InputExamplePage,
        ListExamplePage,
        SliderExamplePage,
        UploaderExamplePage,
        GalleryExamplePage,
        BadgeExamplePage,
        FooterExamplePage,
        LoadmoreExamplePage,
        ProgressExamplePage,
        ActionsheetExamplePage,
        DialogExamplePage,
        ToastExamplePage,
        PickerExamplePage,
        SearchBarExamplePage,
        NavBarExamplePage,
        TabBarExamplePage,
        ArticleExamplePage,
        FlexExamplePage,
        GridExamplePage,
        IconsExamplePage,
        PanelExamplePage,
        PreviewExamplePage,
        MsgExamplePage,
        MsgSuccExamplePage,
        MsgWarnExamplePage
    ],
    providers: [

    ]
})
export class WeUIExampleModule {

}
