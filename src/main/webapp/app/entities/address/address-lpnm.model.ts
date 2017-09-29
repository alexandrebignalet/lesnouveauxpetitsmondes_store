import { BaseEntity } from './../../shared';

export class AddressLpnm implements BaseEntity {
    constructor(
        public id?: number,
        public no?: number,
        public street?: string,
        public city?: string,
        public zipcode?: string,
        public country?: string,
    ) {
    }
}
