'use strict';
var viewModel;
var observable = require('data/observable').Observable;

viewModel = new observable({
    pageTitle: "",
    loading: true,
    searchText: "",
    otherLanguage: "",
    currentLanguage: "",
    MenuKB: "Evidence Briefs",
    MenuResources: "Resources",
    MenuWebinars: "Webinars",
    LatestNewsletter: "Latest Newsletter",
    ChangeLanguage: "",
    GettingStarted: "Getting Started",
    BrandPrefix: "OUTBREAK",
    BrandPostfix: "HELP",
    ContactUs: "Contact Us",
    NCCMTLabel: "NCCMT"
});
 
module.exports = viewModel; 