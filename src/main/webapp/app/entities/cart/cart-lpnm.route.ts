import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CartLpnmComponent } from './cart-lpnm.component';
import { CartLpnmDetailComponent } from './cart-lpnm-detail.component';
import { CartLpnmPopupComponent } from './cart-lpnm-dialog.component';
import { CartLpnmDeletePopupComponent } from './cart-lpnm-delete-dialog.component';

export const cartRoute: Routes = [
    {
        path: 'cart-lpnm',
        component: CartLpnmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.cart.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cart-lpnm/:id',
        component: CartLpnmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.cart.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cartPopupRoute: Routes = [
    {
        path: 'cart-lpnm-new',
        component: CartLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.cart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cart-lpnm/:id/edit',
        component: CartLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.cart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cart-lpnm/:id/delete',
        component: CartLpnmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.cart.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
