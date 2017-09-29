import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CategoryLpnmComponent } from './category-lpnm.component';
import { CategoryLpnmDetailComponent } from './category-lpnm-detail.component';
import { CategoryLpnmPopupComponent } from './category-lpnm-dialog.component';
import { CategoryLpnmDeletePopupComponent } from './category-lpnm-delete-dialog.component';

export const categoryRoute: Routes = [
    {
        path: 'category-lpnm',
        component: CategoryLpnmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'category-lpnm/:id',
        component: CategoryLpnmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.category.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoryPopupRoute: Routes = [
    {
        path: 'category-lpnm-new',
        component: CategoryLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-lpnm/:id/edit',
        component: CategoryLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'category-lpnm/:id/delete',
        component: CategoryLpnmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.category.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
