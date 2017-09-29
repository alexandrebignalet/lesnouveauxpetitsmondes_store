import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { OrderLpnmComponent } from './order-lpnm.component';
import { OrderLpnmDetailComponent } from './order-lpnm-detail.component';
import { OrderLpnmPopupComponent } from './order-lpnm-dialog.component';
import { OrderLpnmDeletePopupComponent } from './order-lpnm-delete-dialog.component';

export const orderRoute: Routes = [
    {
        path: 'order-lpnm',
        component: OrderLpnmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'order-lpnm/:id',
        component: OrderLpnmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.order.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const orderPopupRoute: Routes = [
    {
        path: 'order-lpnm-new',
        component: OrderLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-lpnm/:id/edit',
        component: OrderLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'order-lpnm/:id/delete',
        component: OrderLpnmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.order.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
