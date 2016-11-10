declare module com {
    module telerik {
        module widget {
            module feedback {
                class RadFeedback {
                    public static instance(): RadFeedback;
                    public show(context): void;
                    public init(apiKey, serviceUri, uid): void;
                }
            }
        }
    }
}