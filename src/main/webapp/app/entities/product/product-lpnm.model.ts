import { BaseEntity } from './../../shared';

export class ProductLpnm implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public price?: number,
        public categories?: BaseEntity[],
        public tags?: BaseEntity[],
    ) {
    }
}
