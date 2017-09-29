import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LesnouveauxpetitsmondesStoreSharedModule } from '../../shared';
import { LesnouveauxpetitsmondesStoreAdminModule } from '../../admin/admin.module';
import {
    UserExtraInfoService,
    UserExtraInfoPopupService,
    UserExtraInfoComponent,
    UserExtraInfoDetailComponent,
    UserExtraInfoDialogComponent,
    UserExtraInfoPopupComponent,
    UserExtraInfoDeletePopupComponent,
    UserExtraInfoDeleteDialogComponent,
    userExtraInfoRoute,
    userExtraInfoPopupRoute,
    UserExtraInfoResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userExtraInfoRoute,
    ...userExtraInfoPopupRoute,
];

@NgModule({
    imports: [
        LesnouveauxpetitsmondesStoreSharedModule,
        LesnouveauxpetitsmondesStoreAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserExtraInfoComponent,
        UserExtraInfoDetailComponent,
        UserExtraInfoDialogComponent,
        UserExtraInfoDeleteDialogComponent,
        UserExtraInfoPopupComponent,
        UserExtraInfoDeletePopupComponent,
    ],
    entryComponents: [
        UserExtraInfoComponent,
        UserExtraInfoDialogComponent,
        UserExtraInfoPopupComponent,
        UserExtraInfoDeleteDialogComponent,
        UserExtraInfoDeletePopupComponent,
    ],
    providers: [
        UserExtraInfoService,
        UserExtraInfoPopupService,
        UserExtraInfoResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LesnouveauxpetitsmondesStoreUserExtraInfoModule {}
