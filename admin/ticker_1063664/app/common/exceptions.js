var exceptions = {
    httpStatusCode: {
        200: "OK",
        default: "A server error encountered. Please try the request again."
    },

    nativeExceptions: {
        ios: {
        },
        android: {
            "java.net.UnknownHostException": "It appears that you do not have an internet connection. Please assure that you are connected to WiFi or a mobile network and try again."
        }
    }
}


module.exports = exceptions;