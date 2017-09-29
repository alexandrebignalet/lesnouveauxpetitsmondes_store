import { BaseEntity } from './../../shared';

export class UserExtraInfo implements BaseEntity {
    constructor(
        public id?: number,
        public shippingAddressId?: number,
        public billingAddressId?: number,
        public userId?: number,
    ) {
    }
}
