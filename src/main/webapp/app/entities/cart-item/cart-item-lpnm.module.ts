import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LesnouveauxpetitsmondesStoreSharedModule } from '../../shared';
import {
    CartItemLpnmService,
    CartItemLpnmPopupService,
    CartItemLpnmComponent,
    CartItemLpnmDetailComponent,
    CartItemLpnmDialogComponent,
    CartItemLpnmPopupComponent,
    CartItemLpnmDeletePopupComponent,
    CartItemLpnmDeleteDialogComponent,
    cartItemRoute,
    cartItemPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cartItemRoute,
    ...cartItemPopupRoute,
];

@NgModule({
    imports: [
        LesnouveauxpetitsmondesStoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CartItemLpnmComponent,
        CartItemLpnmDetailComponent,
        CartItemLpnmDialogComponent,
        CartItemLpnmDeleteDialogComponent,
        CartItemLpnmPopupComponent,
        CartItemLpnmDeletePopupComponent,
    ],
    entryComponents: [
        CartItemLpnmComponent,
        CartItemLpnmDialogComponent,
        CartItemLpnmPopupComponent,
        CartItemLpnmDeleteDialogComponent,
        CartItemLpnmDeletePopupComponent,
    ],
    providers: [
        CartItemLpnmService,
        CartItemLpnmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LesnouveauxpetitsmondesStoreCartItemLpnmModule {}
