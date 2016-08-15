import {Http, RequestOptions, Request, RequestMethod, Headers, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import {Injectable } from '@angular/core';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class BlogService {

    public headers: Headers;
    private _url = "http://electrician4london.com/api/blogs";
    private _blogUrl = "http://electrician4london.com/api/blog/";

    constructor(private _http: Http) { }

    public getBlogs(search?: Text) {

        this.headers = new Headers({
        });

        var options = new RequestOptions({
            headers: this.headers
        })

        return this._http.get(this._url,options)
            .map(x => x.json())
            .catch(this.handleError);
    }

    handleError(error) {
        return Observable.throw(error.json().error || 'Server error');
    }

    public getBlogDetail(SlugID: string){

        var _url = this._blogUrl + SlugID; 
          this.headers = new Headers({
        });

        var options = new RequestOptions({
            headers: this.headers
        })

        return this._http.get(_url,options)
            .map(x => x.json())
            .catch(this.handleError);
    }
}