import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { OrderLpnm } from './order-lpnm.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class OrderLpnmService {

    private resourceUrl = SERVER_API_URL + 'api/orders';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/orders';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(order: OrderLpnm): Observable<OrderLpnm> {
        const copy = this.convert(order);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(order: OrderLpnm): Observable<OrderLpnm> {
        const copy = this.convert(order);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<OrderLpnm> {
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
     * Convert a returned JSON object to OrderLpnm.
     */
    private convertItemFromServer(json: any): OrderLpnm {
        const entity: OrderLpnm = Object.assign(new OrderLpnm(), json);
        entity.creationDate = this.dateUtils
            .convertLocalDateFromServer(json.creationDate);
        entity.shippedDate = this.dateUtils
            .convertLocalDateFromServer(json.shippedDate);
        return entity;
    }

    /**
     * Convert a OrderLpnm to a JSON which can be sent to the server.
     */
    private convert(order: OrderLpnm): OrderLpnm {
        const copy: OrderLpnm = Object.assign({}, order);
        copy.creationDate = this.dateUtils
            .convertLocalDateToServer(order.creationDate);
        copy.shippedDate = this.dateUtils
            .convertLocalDateToServer(order.shippedDate);
        return copy;
    }
}
