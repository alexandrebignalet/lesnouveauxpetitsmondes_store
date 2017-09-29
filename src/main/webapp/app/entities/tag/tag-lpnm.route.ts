import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TagLpnmComponent } from './tag-lpnm.component';
import { TagLpnmDetailComponent } from './tag-lpnm-detail.component';
import { TagLpnmPopupComponent } from './tag-lpnm-dialog.component';
import { TagLpnmDeletePopupComponent } from './tag-lpnm-delete-dialog.component';

export const tagRoute: Routes = [
    {
        path: 'tag-lpnm',
        component: TagLpnmComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.tag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tag-lpnm/:id',
        component: TagLpnmDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.tag.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tagPopupRoute: Routes = [
    {
        path: 'tag-lpnm-new',
        component: TagLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.tag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tag-lpnm/:id/edit',
        component: TagLpnmPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.tag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tag-lpnm/:id/delete',
        component: TagLpnmDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'lesnouveauxpetitsmondesStoreApp.tag.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
