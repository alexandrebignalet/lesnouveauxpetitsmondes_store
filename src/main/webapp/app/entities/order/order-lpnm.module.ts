import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LesnouveauxpetitsmondesStoreSharedModule } from '../../shared';
import {
    OrderLpnmService,
    OrderLpnmPopupService,
    OrderLpnmComponent,
    OrderLpnmDetailComponent,
    OrderLpnmDialogComponent,
    OrderLpnmPopupComponent,
    OrderLpnmDeletePopupComponent,
    OrderLpnmDeleteDialogComponent,
    orderRoute,
    orderPopupRoute,
} from './';

const ENTITY_STATES = [
    ...orderRoute,
    ...orderPopupRoute,
];

@NgModule({
    imports: [
        LesnouveauxpetitsmondesStoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        OrderLpnmComponent,
        OrderLpnmDetailComponent,
        OrderLpnmDialogComponent,
        OrderLpnmDeleteDialogComponent,
        OrderLpnmPopupComponent,
        OrderLpnmDeletePopupComponent,
    ],
    entryComponents: [
        OrderLpnmComponent,
        OrderLpnmDialogComponent,
        OrderLpnmPopupComponent,
        OrderLpnmDeleteDialogComponent,
        OrderLpnmDeletePopupComponent,
    ],
    providers: [
        OrderLpnmService,
        OrderLpnmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LesnouveauxpetitsmondesStoreOrderLpnmModule {}
