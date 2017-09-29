import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { TagLpnm } from './tag-lpnm.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TagLpnmService {

    private resourceUrl = SERVER_API_URL + 'api/tags';
    private resourceSearchUrl = SERVER_API_URL + 'api/_search/tags';

    constructor(private http: Http) { }

    create(tag: TagLpnm): Observable<TagLpnm> {
        const copy = this.convert(tag);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(tag: TagLpnm): Observable<TagLpnm> {
        const copy = this.convert(tag);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TagLpnm> {
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
     * Convert a returned JSON object to TagLpnm.
     */
    private convertItemFromServer(json: any): TagLpnm {
        const entity: TagLpnm = Object.assign(new TagLpnm(), json);
        return entity;
    }

    /**
     * Convert a TagLpnm to a JSON which can be sent to the server.
     */
    private convert(tag: TagLpnm): TagLpnm {
        const copy: TagLpnm = Object.assign({}, tag);
        return copy;
    }
}
