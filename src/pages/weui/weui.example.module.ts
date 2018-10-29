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
import { WeUIExampleComponent } from './weui.example';
import { ButtonExamplePageComponent } from './button/example';
import { InputExamplePageComponent } from './input/example';
import { ListExamplePageComponent } from './list/example';
import { SliderExamplePageComponent } from './slider/example';
import { UploaderExamplePageComponent } from './uploader/example';
import { GalleryExamplePageComponent } from './gallery/example';
import { BadgeExamplePageComponent } from './badge/example';
import { FooterExamplePageComponent } from './footer/example';
import { LoadmoreExamplePageComponent } from './loadmore/example';
import { ProgressExamplePageComponent } from './progress/example';

import { ActionsheetExamplePageComponent } from './actionsheet/example';
import { DialogExamplePageComponent } from './dialog/example';
import { ToastExamplePageComponent } from './toast/example';
import { PickerExamplePageComponent } from './picker/example';
import { SearchBarExamplePageComponent } from './searchbar/example';
import { NavBarExamplePageComponent } from './navbar/example';
import { TabBarExamplePageComponent } from './tabbar/example';

/** 无需组件化 */
import { ArticleExamplePageComponent } from './article/example';
import { FlexExamplePageComponent } from './flex/example';
import { GridExamplePageComponent } from './grid/example';
import { IconsExamplePageComponent } from './icons/example';
import { PanelExamplePageComponent } from './panel/example';
import { PreviewExamplePageComponent } from './preview/example';
import { MsgExamplePageComponent, MsgSuccExamplePageComponent, MsgWarnExamplePageComponent } from './msg/example';


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
        WeUIExampleComponent,
        ButtonExamplePageComponent,
        InputExamplePageComponent,
        ListExamplePageComponent,
        SliderExamplePageComponent,
        UploaderExamplePageComponent,
        GalleryExamplePageComponent,
        BadgeExamplePageComponent,
        FooterExamplePageComponent,
        LoadmoreExamplePageComponent,
        ProgressExamplePageComponent,
        ActionsheetExamplePageComponent,
        DialogExamplePageComponent,
        ToastExamplePageComponent,
        PickerExamplePageComponent,
        SearchBarExamplePageComponent,
        NavBarExamplePageComponent,
        TabBarExamplePageComponent,
        ArticleExamplePageComponent,
        FlexExamplePageComponent,
        GridExamplePageComponent,
        IconsExamplePageComponent,
        PanelExamplePageComponent,
        PreviewExamplePageComponent,
        MsgExamplePageComponent,
        MsgSuccExamplePageComponent,
        MsgWarnExamplePageComponent
    ],
    entryComponents: [
        WeUIExampleComponent,
        ButtonExamplePageComponent,
        InputExamplePageComponent,
        ListExamplePageComponent,
        SliderExamplePageComponent,
        UploaderExamplePageComponent,
        GalleryExamplePageComponent,
        BadgeExamplePageComponent,
        FooterExamplePageComponent,
        LoadmoreExamplePageComponent,
        ProgressExamplePageComponent,
        ActionsheetExamplePageComponent,
        DialogExamplePageComponent,
        ToastExamplePageComponent,
        PickerExamplePageComponent,
        SearchBarExamplePageComponent,
        NavBarExamplePageComponent,
        TabBarExamplePageComponent,
        ArticleExamplePageComponent,
        FlexExamplePageComponent,
        GridExamplePageComponent,
        IconsExamplePageComponent,
        PanelExamplePageComponent,
        PreviewExamplePageComponent,
        MsgExamplePageComponent,
        MsgSuccExamplePageComponent,
        MsgWarnExamplePageComponent
    ],
    providers: [

    ]
})
export class WeUIExampleModule {

}
