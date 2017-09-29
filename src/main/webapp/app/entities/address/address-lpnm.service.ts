import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { AddressLpnm } from './address-lpnm.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class AddressLpnmService {

    private resourceUrl = SERVER_API_URL + 'api/addresses';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/addresses';

    constructor(private http: Http) { }

    create(address: AddressLpnm): Observable<AddressLpnm> {
        const copy = this.convert(address);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(address: AddressLpnm): Observable<AddressLpnm> {
        const copy = this.convert(address);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<AddressLpnm> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    search(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceSearchUrl, options)
            .map((res: any) => this.convertResponse(res));
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to AddressLpnm.
     */
    private convertItemFromServer(json: any): AddressLpnm {
        const entity: AddressLpnm = Object.assign(new AddressLpnm(), json);
        return entity;
    }

    /**
     * Convert a AddressLpnm to a JSON which can be sent to the server.
     */
    private convert(address: AddressLpnm): AddressLpnm {
        const copy: AddressLpnm = Object.assign({}, address);
        return copy;
    }
}
