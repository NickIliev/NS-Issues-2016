function MyPageLoaded(args) {
    var page = args.object;
    page.bindingContext = { someItems: [{ title: "One" }, { title: "Two" }, { title: "Three" }] };
}
exports.MyPageLoaded = MyPageLoaded;