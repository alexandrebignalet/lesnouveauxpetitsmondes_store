import { BaseEntity } from './../../shared';

export class CartLpnm implements BaseEntity {
    constructor(
        public id?: number,
        public items?: BaseEntity[],
    ) {
    }
}
