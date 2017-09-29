import { BaseEntity } from './../../shared';

export const enum OrderStatus {
    'NEW',
    'PAID',
    'SHIPPED',
    'DELIVERED',
    'CLOSED'
}

export class OrderLpnm implements BaseEntity {
    constructor(
        public id?: number,
        public creationDate?: any,
        public shippedDate?: any,
        public status?: OrderStatus,
        public cartId?: number,
        public shippingAddressId?: number,
        public billingAddressId?: number,
        public usereiId?: number,
    ) {
    }
}
