import { BaseEntity } from './../../shared';

export class CartItemLpnm implements BaseEntity {
    constructor(
        public id?: number,
        public quantity?: number,
        public productId?: number,
        public cartId?: number,
    ) {
    }
}
