export interface IBlog {
    BlogID: number;
    SLUGID: string;
    Title: string;
    Summary: string;
    Show: boolean;
}
export class Blog implements IBlog {
    constructor(public BlogID: number, public SLUGID: string, public Title: string, public Summary: string, public Show: boolean) { }
}