import { BaseEntity } from './../../shared';

export class CategoryLpnm implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public products?: BaseEntity[],
    ) {
    }
}
