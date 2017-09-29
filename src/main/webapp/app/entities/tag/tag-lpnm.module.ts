import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LesnouveauxpetitsmondesStoreSharedModule } from '../../shared';
import {
    TagLpnmService,
    TagLpnmPopupService,
    TagLpnmComponent,
    TagLpnmDetailComponent,
    TagLpnmDialogComponent,
    TagLpnmPopupComponent,
    TagLpnmDeletePopupComponent,
    TagLpnmDeleteDialogComponent,
    tagRoute,
    tagPopupRoute,
} from './';

const ENTITY_STATES = [
    ...tagRoute,
    ...tagPopupRoute,
];

@NgModule({
    imports: [
        LesnouveauxpetitsmondesStoreSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        TagLpnmComponent,
        TagLpnmDetailComponent,
        TagLpnmDialogComponent,
        TagLpnmDeleteDialogComponent,
        TagLpnmPopupComponent,
        TagLpnmDeletePopupComponent,
    ],
    entryComponents: [
        TagLpnmComponent,
        TagLpnmDialogComponent,
        TagLpnmPopupComponent,
        TagLpnmDeleteDialogComponent,
        TagLpnmDeletePopupComponent,
    ],
    providers: [
        TagLpnmService,
        TagLpnmPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LesnouveauxpetitsmondesStoreTagLpnmModule {}
