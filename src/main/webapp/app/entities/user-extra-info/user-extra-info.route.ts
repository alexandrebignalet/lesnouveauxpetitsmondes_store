import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserExtraInfoComponent } from './user-extra-info.component';
import { UserExtraInfoDetailComponent } from './user-extra-info-detail.component';
import { UserExtraInfoPopupComponent } from './user-extra-info-dialog.component';
import { UserExtraInfoDeletePopupComponent } from './user-extra-info-delete-dialog.component';

@Injectable()
export class UserExtraInfoResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const userExtraInfoRoute: Routes = [
    {
        path: 'user-extra-info',
        component: UserExtraInfoComponent,
        resolve: {
            'pagingParams': UserExtraInfoResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.userExtraInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-extra-info/:id',
        component: UserExtraInfoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.userExtraInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userExtraInfoPopupRoute: Routes = [
    {
        path: 'user-extra-info-new',
        component: UserExtraInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.userExtraInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-extra-info/:id/edit',
        component: UserExtraInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.userExtraInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-extra-info/:id/delete',
        component: UserExtraInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.userExtraInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
