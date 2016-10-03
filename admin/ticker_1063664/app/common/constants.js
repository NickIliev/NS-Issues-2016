var applicationSettingsModule = require("application-settings");

var configObject = {
   // apiUrl: "http://10.85.245.146/Services/UHNow/api/", // Eth0 renu
      apiUrl: "https://uhnow.uhhospitals.org/Service/api/", // Ext Prod
    //apiUrl: "http://uhnow.test.uhhospitals.org/Service/api/", // Ext Test
    //apiUrl: "http://10.85.56.43/Services/UHNow/api/", // Eth0
    //apiUrl: "http://10.85.57.148/Services/UHNow/api/", // Eth0 renu
    //apiUrl: "http://uhnow.test.uhhospitals.org/Services/api/", // QA
    //apiUrl: "http://10.85.244.118/Services/UHNow/api/", // Marconi
    //apiUrl: "http://10.85.248.237/Services/UHNow/api/", // WiFi Tesla
    //apiUrl: "http://MSMN03KDMB06/Services/UHNow/api/",
    analyticsId: "dmzna8gid0sle9e6",
    googleMapsAPIKey: "AIzaSyAtRVvG3Be3xXiZFR7xp-K-9hy4nZ4hMFs",
    maxLocationAge: 5 * 60 * 1000, // use cached location for maximum of 5 minutes,
    referralEaseUrl: "http://10.85.244.49:80/Services/UHNow/api/",
    //symptomCheckerURL: "http://uhnow.test.uhhospitals.org/Service/symptom-checker.html"
    symptomCheckerURL: "https://uhnow.uhhospitals.org/Service/symptom-checker.html"
};

module.exports = configObject;
