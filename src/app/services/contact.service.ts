import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactMessage } from '../model/contact.model';
import { AppSetting } from '../app.setting';


@Injectable({
    providedIn: 'root'
})

export class ContactService {
    public _baseUrl = AppSetting.baseUrl;
    private _sendSms = this._baseUrl + "api/Contact";

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }), withCredentials: false,
    }

    constructor(protected _http: HttpClient) { }

    sendMessage(model: ContactMessage): Observable<any> {

        return this._http.post<any>(this._sendSms, model, this.httpOptions);
    }


}
