import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { AddressLpnmComponent } from './address-lpnm.component';
import { AddressLpnmDetailComponent } from './address-lpnm-detail.component';
import { AddressLpnmPopupComponent } from './address-lpnm-dialog.component';
import { AddressLpnmDeletePopupComponent } from './address-lpnm-delete-dialog.component';

export const addressRoute: Routes = [
    {
        path: 'address-lpnm',
        component: AddressLpnmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'address-lpnm/:id',
        component: AddressLpnmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.address.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const addressPopupRoute: Routes = [
    {
        path: 'address-lpnm-new',
        component: AddressLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-lpnm/:id/edit',
        component: AddressLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'address-lpnm/:id/delete',
        component: AddressLpnmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.address.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
