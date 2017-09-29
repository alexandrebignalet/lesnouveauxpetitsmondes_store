import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LesnouveauxpetitsmondesStoreSharedModule } from '../../shared';
import {
    CategoryLpnmService,
    CategoryLpnmPopupService,
    CategoryLpnmComponent,
    CategoryLpnmDetailComponent,
    CategoryLpnmDialogComponent,
    CategoryLpnmPopupComponent,
    CategoryLpnmDeletePopupComponent,
    CategoryLpnmDeleteDialogComponent,
    categoryRoute,
    categoryPopupRoute,
} from './';

const ENTITY_STATES = [
    ...categoryRoute,
    ...categoryPopupRoute,
];

@NgModule({
    imports: [
        LesnouveauxpetitsmondesStoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CategoryLpnmComponent,
        CategoryLpnmDetailComponent,
        CategoryLpnmDialogComponent,
        CategoryLpnmDeleteDialogComponent,
        CategoryLpnmPopupComponent,
        CategoryLpnmDeletePopupComponent,
    ],
    entryComponents: [
        CategoryLpnmComponent,
        CategoryLpnmDialogComponent,
        CategoryLpnmPopupComponent,
        CategoryLpnmDeleteDialogComponent,
        CategoryLpnmDeletePopupComponent,
    ],
    providers: [
        CategoryLpnmService,
        CategoryLpnmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LesnouveauxpetitsmondesStoreCategoryLpnmModule {}
