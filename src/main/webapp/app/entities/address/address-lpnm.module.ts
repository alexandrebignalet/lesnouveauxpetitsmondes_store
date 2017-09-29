import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LesnouveauxpetitsmondesStoreSharedModule } from '../../shared';
import {
    AddressLpnmService,
    AddressLpnmPopupService,
    AddressLpnmComponent,
    AddressLpnmDetailComponent,
    AddressLpnmDialogComponent,
    AddressLpnmPopupComponent,
    AddressLpnmDeletePopupComponent,
    AddressLpnmDeleteDialogComponent,
    addressRoute,
    addressPopupRoute,
} from './';

const ENTITY_STATES = [
    ...addressRoute,
    ...addressPopupRoute,
];

@NgModule({
    imports: [
        LesnouveauxpetitsmondesStoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        AddressLpnmComponent,
        AddressLpnmDetailComponent,
        AddressLpnmDialogComponent,
        AddressLpnmDeleteDialogComponent,
        AddressLpnmPopupComponent,
        AddressLpnmDeletePopupComponent,
    ],
    entryComponents: [
        AddressLpnmComponent,
        AddressLpnmDialogComponent,
        AddressLpnmPopupComponent,
        AddressLpnmDeleteDialogComponent,
        AddressLpnmDeletePopupComponent,
    ],
    providers: [
        AddressLpnmService,
        AddressLpnmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LesnouveauxpetitsmondesStoreAddressLpnmModule {}
