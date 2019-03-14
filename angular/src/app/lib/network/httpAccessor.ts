import * as $ from 'jquery';
import {  Observable } from 'rxjs';

export class HttpAccessor {
    constructor() { }
    public static getJSON(url: string, success: any): void {
        /**jquery version */
        $.getJSON(url, d => {
            success(d);
        });
    }

    /**
    * ajax请求
    * @param options 参数{}
    */
    public static ajax(options: ajaxOption): Observable<any> {
        return Observable.create(observer => {
            const parms = {
                url: '',
                data: '',
                type: 'post',
                contentType: 'application/x-www-form-urlencoded',
                headers: {
                },
                dataType: 'json',
            };

            $.extend(parms, options);

            const option = {
                url: parms.url,
                type: parms.type,
                data: parms.data,
                headers: parms.headers,
                contentType: parms.contentType,
                dataType: parms.dataType,
                success: function (msg) {
                    observer.next(msg);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    // const xml = JSON.parse(XMLHttpRequest.responseText);
                    observer.error(XMLHttpRequest);
                },
                complete: function (XMLHttpRequest, textStatus) {
                    observer.complete();
                }
            };

            $.ajax(option);
        });
    }
}

export interface ajaxOption {
    url: string
    data: any,
    type?: string,
    contentType?: string,
    headers?: any,
    dataType?: string,
}
