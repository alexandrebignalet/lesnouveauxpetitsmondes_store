import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LesnouveauxpetitsmondesStoreSharedModule } from '../../shared';
import {
    ProductLpnmService,
    ProductLpnmPopupService,
    ProductLpnmComponent,
    ProductLpnmDetailComponent,
    ProductLpnmDialogComponent,
    ProductLpnmPopupComponent,
    ProductLpnmDeletePopupComponent,
    ProductLpnmDeleteDialogComponent,
    productRoute,
    productPopupRoute,
    ProductLpnmResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...productRoute,
    ...productPopupRoute,
];

@NgModule({
    imports: [
        LesnouveauxpetitsmondesStoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProductLpnmComponent,
        ProductLpnmDetailComponent,
        ProductLpnmDialogComponent,
        ProductLpnmDeleteDialogComponent,
        ProductLpnmPopupComponent,
        ProductLpnmDeletePopupComponent,
    ],
    entryComponents: [
        ProductLpnmComponent,
        ProductLpnmDialogComponent,
        ProductLpnmPopupComponent,
        ProductLpnmDeleteDialogComponent,
        ProductLpnmDeletePopupComponent,
    ],
    providers: [
        ProductLpnmService,
        ProductLpnmPopupService,
        ProductLpnmResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LesnouveauxpetitsmondesStoreProductLpnmModule {}
