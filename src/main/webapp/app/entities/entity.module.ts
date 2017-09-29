import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LesnouveauxpetitsmondesStoreCategoryLpnmModule } from './category/category-lpnm.module';
import { LesnouveauxpetitsmondesStoreProductLpnmModule } from './product/product-lpnm.module';
import { LesnouveauxpetitsmondesStoreTagLpnmModule } from './tag/tag-lpnm.module';
import { LesnouveauxpetitsmondesStoreAddressLpnmModule } from './address/address-lpnm.module';
import { LesnouveauxpetitsmondesStoreCartLpnmModule } from './cart/cart-lpnm.module';
import { LesnouveauxpetitsmondesStoreCartItemLpnmModule } from './cart-item/cart-item-lpnm.module';
import { LesnouveauxpetitsmondesStoreOrderLpnmModule } from './order/order-lpnm.module';
import { LesnouveauxpetitsmondesStoreUserExtraInfoModule } from './user-extra-info/user-extra-info.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        LesnouveauxpetitsmondesStoreCategoryLpnmModule,
        LesnouveauxpetitsmondesStoreProductLpnmModule,
        LesnouveauxpetitsmondesStoreTagLpnmModule,
        LesnouveauxpetitsmondesStoreAddressLpnmModule,
        LesnouveauxpetitsmondesStoreCartLpnmModule,
        LesnouveauxpetitsmondesStoreCartItemLpnmModule,
        LesnouveauxpetitsmondesStoreOrderLpnmModule,
        LesnouveauxpetitsmondesStoreUserExtraInfoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LesnouveauxpetitsmondesStoreEntityModule {}
