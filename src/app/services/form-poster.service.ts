import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Employee } from "../models/employee.model";
import {Observable, throwError} from 'rxjs';
import { catchError, tap, map, delay } from 'rxjs/operators';

@Injectable()
export class FormPoster
{

    constructor(private http: Http) {}

    postEmployeeForm(employee: Employee) : Observable<any>
    {
       // console.log('posting employee ', employee );
       let body = JSON.stringify(employee);
       let headers = new Headers({'Content-Type': 'application/json'});
       let options = new RequestOptions({ headers: headers});

       //return this.http.post(this.getUrl(), body, options).pipe(map(this.extractData));
       return this.http.post(this.getUrl(), body, options).pipe(map(this.extractData), catchError(e => this.handleError(e)));


    }

    getUrl() : string
    {
        return 'http://localhost:3100/postemployee';
    }

    getLanguages() : Observable<any>
    {
        return this.http.get(this.getUrl()).pipe(map(this.extractLanguages), catchError(e => this.handleError(e)));
    }

    //Returns data from a JSON object
    private extractData(res: Response)
    {
        let body = res.json();
        return body.fields || {};
    }

    //Returns languages back from node server
    private extractLanguages(res: Response)
    {
        let body = res.json();
        return body.data || {};
    }

    //Handles and returns any errors
    private handleError(error: any)
    {
        console.error('post error: ', error);
       // return Observable.throw(error.statusText);
       return throwError(error);
    }
}