import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit, NgZone, Input } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { Observable as RxObservable } from "rxjs/Rx";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";

@Component({
    selector: "my-app",
    templateUrl: "app.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
    @Input() public job: any = { salesAssociateName: "default job" };
    @Input() public salesAssociateName: string = "default name";

    constructor(private http: Http, private change:ChangeDetectorRef) { }

    ngOnInit() {
        this.getJob();
    }

    getJob() {
        var url = "http://httpbin.org/get";
        var headers = this.createRequestHeader();

        this.http.get(url, { headers: headers })
            .map(response => response.json())
            .do(data => {
                this.setData();
            }).subscribe(
                () => this.success(),
                (error) => this.error()
            );
    }

    private createRequestHeader() {
        let headers = new Headers();
        return headers;
    }

    setData() {

        this.job.salesAssociateName = "NEW job SalesAssociateName";
        this.salesAssociateName = "NEW job FullName";
        this.change.markForCheck();
    }

    success() {
        alert("success");
    }

    error() {
        alert("There was a problem retrieving your customer job.");
    }
}
