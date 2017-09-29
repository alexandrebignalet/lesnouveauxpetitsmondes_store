import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CartItemLpnmComponent } from './cart-item-lpnm.component';
import { CartItemLpnmDetailComponent } from './cart-item-lpnm-detail.component';
import { CartItemLpnmPopupComponent } from './cart-item-lpnm-dialog.component';
import { CartItemLpnmDeletePopupComponent } from './cart-item-lpnm-delete-dialog.component';

export const cartItemRoute: Routes = [
    {
        path: 'cart-item-lpnm',
        component: CartItemLpnmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.cartItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'cart-item-lpnm/:id',
        component: CartItemLpnmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.cartItem.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const cartItemPopupRoute: Routes = [
    {
        path: 'cart-item-lpnm-new',
        component: CartItemLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.cartItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cart-item-lpnm/:id/edit',
        component: CartItemLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.cartItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cart-item-lpnm/:id/delete',
        component: CartItemLpnmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.cartItem.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
