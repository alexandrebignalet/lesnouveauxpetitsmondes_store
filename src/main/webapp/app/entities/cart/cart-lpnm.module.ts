import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LesnouveauxpetitsmondesStoreSharedModule } from '../../shared';
import {
    CartLpnmService,
    CartLpnmPopupService,
    CartLpnmComponent,
    CartLpnmDetailComponent,
    CartLpnmDialogComponent,
    CartLpnmPopupComponent,
    CartLpnmDeletePopupComponent,
    CartLpnmDeleteDialogComponent,
    cartRoute,
    cartPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cartRoute,
    ...cartPopupRoute,
];

@NgModule({
    imports: [
        LesnouveauxpetitsmondesStoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        CartLpnmComponent,
        CartLpnmDetailComponent,
        CartLpnmDialogComponent,
        CartLpnmDeleteDialogComponent,
        CartLpnmPopupComponent,
        CartLpnmDeletePopupComponent,
    ],
    entryComponents: [
        CartLpnmComponent,
        CartLpnmDialogComponent,
        CartLpnmPopupComponent,
        CartLpnmDeleteDialogComponent,
        CartLpnmDeletePopupComponent,
    ],
    providers: [
        CartLpnmService,
        CartLpnmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LesnouveauxpetitsmondesStoreCartLpnmModule {}
