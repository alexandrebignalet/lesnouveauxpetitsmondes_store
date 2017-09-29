import { BaseEntity } from './../../shared';

export class TagLpnm implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public products?: BaseEntity[],
    ) {
    }
}
