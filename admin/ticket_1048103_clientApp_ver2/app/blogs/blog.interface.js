"use strict";
var Blog = (function () {
    function Blog(BlogID, SLUGID, Title, Summary, Show) {
        this.BlogID = BlogID;
        this.SLUGID = SLUGID;
        this.Title = Title;
        this.Summary = Summary;
        this.Show = Show;
    }
    return Blog;
}());
exports.Blog = Blog;
//# sourceMappingURL=blog.interface.js.map