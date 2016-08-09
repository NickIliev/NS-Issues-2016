"use strict";
var http_1 = require('@angular/http');
var Observable_1 = require('rxjs/Observable');
var core_1 = require('@angular/core');
require('rxjs/Rx');
require('rxjs/add/operator/map');
var BlogService = (function () {
    function BlogService(_http) {
        this._http = _http;
        this._url = "http://electrician4london.com/api/blogs";
        this._blogUrl = "http://electrician4london.com/api/blog/";
    }
    BlogService.prototype.getBlogs = function (search) {
        this.headers = new http_1.Headers({});
        var options = new http_1.RequestOptions({
            headers: this.headers
        });
        return this._http.get(this._url, options)
            .map(function (x) { return x.json(); })
            .catch(this.handleError);
    };
    BlogService.prototype.handleError = function (error) {
        return Observable_1.Observable.throw(error.json().error || 'Server error');
    };
    BlogService.prototype.getBlogDetail = function (SlugID) {
        var _url = this._blogUrl + SlugID;
        this.headers = new http_1.Headers({});
        var options = new http_1.RequestOptions({
            headers: this.headers
        });
        return this._http.get(_url, options)
            .map(function (x) { return x.json(); })
            .catch(this.handleError);
    };
    BlogService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], BlogService);
    return BlogService;
}());
exports.BlogService = BlogService;
//# sourceMappingURL=blog.service.js.map