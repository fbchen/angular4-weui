/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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

import { ArticleExamplePage } from './article/example';
import { FlexExamplePage } from './flex/example';
import { GridExamplePage } from './grid/example';
import { IconsExamplePage } from './icons/example';
import { PanelExamplePage } from './panel/example';
import { PreviewExamplePage } from './preview/example';
import { MsgExamplePage, MsgSuccExamplePage, MsgWarnExamplePage } from './msg/example';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'button', component: ButtonExamplePage },
            { path: 'input', component: InputExamplePage },
            { path: 'list', component: ListExamplePage },
            { path: 'slider', component: SliderExamplePage },
            { path: 'uploader', component: UploaderExamplePage },
            { path: 'gallery', component: GalleryExamplePage },
            { path: 'badge', component: BadgeExamplePage },
            { path: 'footer', component: FooterExamplePage },
            { path: 'loadmore', component: LoadmoreExamplePage },
            { path: 'progress', component: ProgressExamplePage },
            { path: 'actionsheet', component: ActionsheetExamplePage },
            { path: 'dialog', component: DialogExamplePage },
            { path: 'toast', component: ToastExamplePage },
            { path: 'picker', component: PickerExamplePage },
            { path: 'searchbar', component: SearchBarExamplePage },
            { path: 'navbar', component: NavBarExamplePage },
            { path: 'tabbar', component: TabBarExamplePage },

            { path: 'article', component: ArticleExamplePage },
            { path: 'flex', component: FlexExamplePage },
            { path: 'grid', component: GridExamplePage },
            { path: 'icons', component: IconsExamplePage },
            { path: 'panel', component: PanelExamplePage },
            { path: 'preview', component: PreviewExamplePage },
            { path: 'msg', component: MsgExamplePage },
            { path: 'msg/success', component: MsgSuccExamplePage },
            { path: 'msg/warn', component: MsgWarnExamplePage }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class WeUIExampleRoutingModule { }
