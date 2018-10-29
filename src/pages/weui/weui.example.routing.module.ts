/**
 * @license
 * Copyright 厦门乾元盛世科技有限公司 All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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

import { ArticleExamplePageComponent } from './article/example';
import { FlexExamplePageComponent } from './flex/example';
import { GridExamplePageComponent } from './grid/example';
import { IconsExamplePageComponent } from './icons/example';
import { PanelExamplePageComponent } from './panel/example';
import { PreviewExamplePageComponent } from './preview/example';
import { MsgExamplePageComponent, MsgSuccExamplePageComponent, MsgWarnExamplePageComponent } from './msg/example';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'button', component: ButtonExamplePageComponent },
            { path: 'input', component: InputExamplePageComponent },
            { path: 'list', component: ListExamplePageComponent },
            { path: 'slider', component: SliderExamplePageComponent },
            { path: 'uploader', component: UploaderExamplePageComponent },
            { path: 'gallery', component: GalleryExamplePageComponent },
            { path: 'badge', component: BadgeExamplePageComponent },
            { path: 'footer', component: FooterExamplePageComponent },
            { path: 'loadmore', component: LoadmoreExamplePageComponent },
            { path: 'progress', component: ProgressExamplePageComponent },
            { path: 'actionsheet', component: ActionsheetExamplePageComponent },
            { path: 'dialog', component: DialogExamplePageComponent },
            { path: 'toast', component: ToastExamplePageComponent },
            { path: 'picker', component: PickerExamplePageComponent },
            { path: 'searchbar', component: SearchBarExamplePageComponent },
            { path: 'navbar', component: NavBarExamplePageComponent },
            { path: 'tabbar', component: TabBarExamplePageComponent },

            { path: 'article', component: ArticleExamplePageComponent },
            { path: 'flex', component: FlexExamplePageComponent },
            { path: 'grid', component: GridExamplePageComponent },
            { path: 'icons', component: IconsExamplePageComponent },
            { path: 'panel', component: PanelExamplePageComponent },
            { path: 'preview', component: PreviewExamplePageComponent },
            { path: 'msg', component: MsgExamplePageComponent },
            { path: 'msg/success', component: MsgSuccExamplePageComponent },
            { path: 'msg/warn', component: MsgWarnExamplePageComponent }
        ])
    ],
    exports: [
        RouterModule
    ]
})
export class WeUIExampleRoutingModule { }
